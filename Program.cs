using System.Text.Json.Serialization;
using IdentityModel.OidcClient;
using k8s.KubeConfigModels;
using Microsoft.EntityFrameworkCore;
using spark;
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



// app.MapGet("/categories", async (SparkDb db) =>
//     await db.category
//     //adding data about department
//     .ToListAsync());
// app.MapGet("/topics", async (SparkDb db) =>
//     await db.topic
//     //adding data about department
//     .ToListAsync());

app.MapGet("/categories", async (SparkDb db) =>
    await db.category
    .Include(c => c.topic)
        .ThenInclude(t => t.EvaluationOptions)
    .ToListAsync());


// app.MapPost("/eval", async (spark.Models.EvaluationForm form, SparkDb db) =>
// {
//     db.evaluation_form.Add(form);
//     await db.SaveChangesAsync();

//     return Results.Created($"/eval/{form.id}", form);
// });
app.MapGet("/eval/{id}", async (int id, SparkDb db) =>
{
    var user = await db.user
        .Include(u => u.department) // Include department data
        .FirstOrDefaultAsync(u => u.id == id);

    return user is not null ? Results.Ok(user) : Results.NotFound();
});
app.MapGet("/evaluate", async (int id, SparkDb db) =>
     await db.user
      .Include(u => u.department).ToListAsync());

app.MapPost("/evaluate", async ([Microsoft.AspNetCore.Mvc.FromBody] EvaluationRequest request, SparkDb db) =>
{
    var form = new EvaluationForm
    {
        user_id = request.UserId,
        manager_id = request.ManagerId,
        created = DateTime.UtcNow,
        department_id = request.DepartmentId, 
        is_ready = true
    };

    db.evaluation_form.Add(form);
    await db.SaveChangesAsync();

    foreach (var selectedOption in request.SelectedOptions)
    {
        var optionRecord = new EvaluationForm
        {
            option_id = selectedOption.OptionId,
            user_id = form.user_id,
            manager_id = form.manager_id,
            department_id = form.department_id,
            created = form.created,
            is_ready = form.is_ready
        };
        db.evaluation_form.Add(optionRecord);
    }

    foreach (var topicComment in request.TopicComments)
    {
        var comment = new TopicComment
        {
            topic_id = topicComment.TopicId,
            comment = topicComment.Comment,
            form_id = form.id
        };
        db.topic_comment.Add(comment);
    }

    foreach (var categoryComment in request.CategoryComments)
    {
        var comment = new CategoryComment
        {
            category_id = categoryComment.CategoryId,
            comment = categoryComment.Comment,
            form_id = form.id
        };
        db.category_comment.Add(comment);
    }

    await db.SaveChangesAsync();
    return Results.Ok(new { success = true });
});


///////////////////////////////////////////////////////
///

// app.MapPost("/evaluate", async ([Microsoft.AspNetCore.Mvc.FromBody] EvaluationRequest request, SparkDb db) =>

// {
//     // Создаем новую форму оценки
//     db.evaluation_form.Add(request.form);
//     await db.SaveChangesAsync();

//     // Привязываем все EvaluationOptions к форме
//     foreach (var option in request.options)
//     {
//         option.form_id = request.form.id;
//         db.evaluation_option.Add(option);
//     }

//     // Привязываем все TopicComments к форме
//     foreach (var comment in request.topicComments)
//     {
//         comment.form_id = request.form.id;
//         db.topic_comment.Add(comment);
//     }

//     // Привязываем CategoryComment к форме
//     request.categoryComment.form_id = request.form.id;
//     db.category_comment.Add(request.categoryComment);

//     // Сохраняем изменения
//     await db.SaveChangesAsync();

//     return Results.Ok(new { success = true });
// });


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