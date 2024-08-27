using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using spark.Models;

var builder = WebApplication.CreateBuilder(args);

// Use the connection string from appsettings.json
builder.Services.AddDbContext<SparkDb>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("sparkdb"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("sparkdb"))
    ).LogTo(Console.WriteLine, LogLevel.Information));
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
var myPolicy = "mypolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myPolicy, builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
});

var app = builder.Build();

app.UseCors(myPolicy);

app.MapPost("/login", async (spark.Models.User employee, SparkDb db) =>
{
    var user = await db.user
        .FirstOrDefaultAsync(u => u.username == employee.username && u.password == employee.password);

    if (user == null)
    {
        return Results.Json(new { success = false, message = "Invalid username or password" });
    }

    bool isAdmin = user.is_admin;
    // Check if user has dependent users
    bool isManager = await db.user.AnyAsync(u => u.manager_id == user.id);

    // Optionally, you can generate a JWT token here for authentication
    return Results.Json(new
    {
        success = true,
        id = user.id,
        username = user.username,
        isAdmin = isAdmin,
        isManager = isManager
    });
});

// Get all employees
app.MapGet("/employees", async (SparkDb db) =>
    await db.user
    .Include(u => u.department) //adding data about department
    .ToListAsync());

app.MapGet("/users/{id}", async (int id, SparkDb db) =>
{
    var user = await db.user
        .Include(u => u.department) // Include department data
        .FirstOrDefaultAsync(u => u.id == id);

    return user is not null ? Results.Ok(user) : Results.NotFound();
});

app.MapGet("/categories", async (SparkDb db) =>
    await db.category
    // .Include(c => c.topic)
    //     .ThenInclude(t => t.EvaluationOptions)
    .ToListAsync());

app.MapGet("/eval/{id}", async (int id, SparkDb db) =>
{
    var user = await db.user
        .Include(u => u.department) // Include department data
        .FirstOrDefaultAsync(u => u.id == id);

    return user is not null ? Results.Ok(user) : Results.NotFound();
});

// app.MapGet("/evaluate", async (int id, SparkDb db) =>
//      await db.user
//       .Include(u => u.department).ToListAsync());

app.MapPost("/evaluate", async (EvaluationRequest formDto, SparkDb _context) =>
{
    // Шаг 1: Create a record in the evaluation_form table
    var evaluationForm = new EvaluationForm
    {
        user_id = formDto.UserId,
        department_id = formDto.DepartmentId,
        manager_id = formDto.ManagerId,
        created = DateTime.Now,
        is_ready = true,
    };

    _context.evaluation_form.Add(evaluationForm);
    await _context.SaveChangesAsync();

    // Getting the ID of the new evaluation_form record for use in other tables ??
    int formId = evaluationForm.id;

    // Шаг 2: Inserting data into the option_evaluation table
    if (formDto != null && formDto.EvaluationOptions != null)
    {
        foreach (var option in formDto.EvaluationOptions)
        {
            var optionEvaluation = new EvaluationOption
            {
                topic_id = option.TopicId,
                comment = option.Comment,
                score = option.Score,
                form_id = formId
            };
            _context.option_evaluation.Add(optionEvaluation);
        }
    }

    // Шаг 3: Inserting comments for categories

    if (formDto != null && formDto.CategoryComments != null)
    {
        foreach (var categoryComment in formDto.CategoryComments)
        {
            var categoryCommentEntity = new CategoryComment
            {
                category_id = categoryComment.CategoryId,
                comment = categoryComment.Comment,
                form_id = formId // We use the received formId
            };
            _context.category_comment.Add(categoryCommentEntity);

        }
    }
    // We save all changes to the database
    await _context.SaveChangesAsync();

    return Results.Ok(new { message = "Evaluation form created successfully!" });
});

app.MapGet("/evaluate/user/{userId}", async (int userId, SparkDb _context) =>
{
    // Определяем текущую дату и дату год назад
    var oneYearAgo = DateTime.Now.AddYears(-1);

    // Находим форму оценки по userId и проверяем дату создания
    var evaluationForm = await _context.evaluation_form
        .Include(ef => ef.EvaluationOptions)
            .ThenInclude(eo => eo.Topic)
        .Include(ef => ef.CategoryComments)
        .Where(ef => ef.user_id == userId && ef.created >= oneYearAgo)
        .OrderByDescending(ef => ef.created) // На случай, если нужно выбрать самую последнюю форму
        .FirstOrDefaultAsync();

    if (evaluationForm == null)
    {
        return Results.NotFound(new { message = "Evaluation form not found or too old." });
    }

    // Подготовка ответа
    var response = new
    {
        evaluationForm.id,
        evaluationForm.user_id,
        evaluationForm.department_id,
        evaluationForm.manager_id,
        evaluationForm.created,
        evaluationForm.is_ready,
        EvaluationOptions = evaluationForm.EvaluationOptions.Select(eo => new
        {
            eo.id,
            Topic = eo.Topic == null ? null : new
            {
                eo.Topic.id,
                eo.Topic.category_id,
            },
            eo.comment,
            eo.score
        }).ToList(),
        CategoryComments = evaluationForm.CategoryComments.Select(cc => new
        {
            cc.id,
            cc.category_id,
            cc.comment
        }).ToList()
    };

    return Results.Ok(response);
});

app.MapPost("/employees-with-image", async (HttpRequest request, SparkDb db) =>
{
    var form = await request.ReadFormAsync();
    var user = new User
    {
        firstname = form["firstname"],
        lastname = form["lastname"],
        email = form["email"],
        username = form["username"],
        password = form["password"],
        company_role = form["company_role"],
        is_admin = bool.TryParse(form["is_admin"], out bool isAdmin) ? isAdmin : false,
        hired_date = DateTime.TryParse(form["hired_date"], out DateTime hiredDate) ? hiredDate : (DateTime?)null,
        manager_id = int.TryParse(form["manager_id"], out int managerId) ? managerId : (int?)null,
        department_id = int.TryParse(form["department_id"], out int departmentId) ? departmentId : (int?)null
    };

    // Validate department_id
    if (user.department_id != null)
    {
        var department = await db.department.FindAsync(user.department_id);
        if (department == null)
        {
            return Results.BadRequest("Invalid department ID.");
        }
    }

    // Process the file upload
    var file = form.Files["image"];
    if (file != null && file.Length > 0)
    {
        var filePath = Path.Combine("Uploads", file.FileName);
        using (var stream = System.IO.File.Create(filePath))
        {
            await file.CopyToAsync(stream);
            // user.img = stream.ToArray(); 
        }
        // Optionally, save the file path to the database (assuming a `ProfileImagePath` property in User)
        // user.ProfileImagePath = filePath;
    }

    db.user.Add(user);
    await db.SaveChangesAsync();

    return Results.Created($"/employees/{user.id}", user);
});


app.MapGet("/departments", async (SparkDb db) =>
    await db.department.ToListAsync());


//////////////////////

app.MapGet("/employees/admins", async (SparkDb db) =>
    await db.user.Where(t => t.is_admin).ToListAsync());

app.MapGet("/employees/{id}", async (int id, SparkDb db) =>
    await db.user.FindAsync(id)
        is spark.Models.User employee
            ? Results.Ok(employee)
            : Results.NotFound());

app.MapPost("/employees", async (spark.Models.User employee, SparkDb db) =>
{
    db.user.Add(employee);
    await db.SaveChangesAsync();

    return Results.Created($"/employees/{employee.id}", employee);
});

app.MapPut("/employees/{id}", async (int id, spark.Models.User inputEmployee, SparkDb db) =>
{
    var employee = await db.user.FindAsync(id);

    if (employee is null) return Results.NotFound();

    employee.firstname = inputEmployee.firstname;
    employee.lastname = inputEmployee.lastname;
    employee.email = inputEmployee.email;
    employee.company_role = inputEmployee.company_role;
    employee.is_admin = inputEmployee.is_admin;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/employees/{id}", async (int id, SparkDb db) =>
{
    if (await db.user.FindAsync(id) is spark.Models.User employee)
    {
        db.user.Remove(employee);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();