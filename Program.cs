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
        using (var memoryStream = new MemoryStream())
        {
            await file.CopyToAsync(memoryStream);
            user.img = memoryStream.ToArray();  // Convert image to byte array
        }
    }

    db.user.Add(user);
    await db.SaveChangesAsync();

    return Results.Created($"/employees/{user.id}", user);
});

app.MapGet("/images/{id}", async (int id, SparkDb db) =>
{
    var user = await db.user.FindAsync(id);
    if (user == null || user.img == null)
    {
        return Results.NotFound();
    }
    return Results.File(user.img, "image/jpeg");  // Adjust content type as needed
});
app.MapGet("/departments", async (SparkDb db) =>
    await db.department.ToListAsync());


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

app.MapPut("/users/{id}", async (int id, spark.Models.User editEmployee, SparkDb db) =>
{
    // Find the existing employee in the database
    var employee = await db.user.FindAsync(id);

    // If employee not found, return 404 Not Found
    if (employee is null) return Results.NotFound();

    // Optional: Add validation for the incoming editEmployee data
    if (editEmployee == null) return Results.BadRequest("Invalid data.");

    // Update fields if they are provided
    if (!string.IsNullOrEmpty(editEmployee.firstname))
        employee.firstname = editEmployee.firstname;

    if (!string.IsNullOrEmpty(editEmployee.lastname))
        employee.lastname = editEmployee.lastname;

    if (!string.IsNullOrEmpty(editEmployee.email))
        employee.email = editEmployee.email;

    if (!string.IsNullOrEmpty(editEmployee.company_role))
        employee.company_role = editEmployee.company_role;


        employee.department_id = editEmployee.department_id;
        employee.hired_date = editEmployee.hired_date;

    // Optional: Handle updating the image, password, or other fields if needed
    // Example: if (editEmployee.ProfileImage != null) { ... }

    // Save changes to the database
    await db.SaveChangesAsync();

    // Optionally, return the updated resource
    return Results.NoContent(); // or `Results.Ok(employee)` if you want to return the updated resource
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