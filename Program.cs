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

app.MapGet("/evaluate", async (int id, SparkDb db) =>
     await db.user
      .Include(u => u.department).ToListAsync());


app.MapPost("/evaluate", async (spark.Models.EvaluationRequest request, SparkDb db) =>
{
    if (request == null || request.form == null)
    {
        return Results.BadRequest("Invalid request payload.");
    }

    // Create and save the evaluation form
    var evaluationForm = new EvaluationForm
    {
        user_id = request.form.user_id,
        department_id = request.form.department_id,
        manager_id = request.form.manager_id,
        created = DateTime.UtcNow,
        is_ready = true // Mark the form as completed
    };

    db.evaluation_form.Add(evaluationForm);
    await db.SaveChangesAsync();

    // Save selected options (evaluation of topics)
    if (request.options != null && request.options.Count > 0)
    {
        foreach (var option in request.options)
        {
            var evaluationOption = new EvaluationOption
            {
                topic_id = option.topic_id,
                score = option.score,
                comment = option.comment
            };

            db.evaluation_option.Add(evaluationOption);
            await db.SaveChangesAsync();  // Save each option
        }
    }

    // Save topic comments
    if (request.comment != null && request.comment.Count > 0)
    {
        foreach (var topicComment in request.comment)
        {
            var behavior = new Behavior
            {
                form_id = evaluationForm.id,
                text = topicComment.comment
            };

            db.behavior.Add(behavior);
            await db.SaveChangesAsync();  // Save each topic comment
        }
    }

    // Save category comments
    if (request.categoryComment != null)
    {
        var categoryComment = new CategoryComment
        {
            category_id = request.categoryComment.category_id,
            form_id = evaluationForm.id,
            comment = request.categoryComment.comment
        };

        db.category_comment.Add(categoryComment);
        await db.SaveChangesAsync();  // Save category comment
    }

    return Results.Ok(new { success = true, message = "Evaluation submitted successfully." });
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