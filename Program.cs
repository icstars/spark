using Microsoft.EntityFrameworkCore;
using SparkAPI.Data; // Ensure this using statement is present


var builder = WebApplication.CreateBuilder(args);

// Use the connection string from appsettings.json
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("sparkdb"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("sparkdb"))
    ));



var  myPolicy= "mypolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myPolicy, builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
});


var app = builder.Build();

app.UseCors(myPolicy);



app.MapPost("/login", async (Employee employee, ApplicationDbContext db) =>
{
    var user = await db.Employees
        .FirstOrDefaultAsync(u => u.username == employee.username && u.password == employee.password);

    if (user == null)
    {
        return Results.Json(new { success = false, message = "Invalid username or password" });
    }

    // Optionally, you can generate a JWT token here for authentication
    return Results.Json(new { success = true, username = user.username });
});

// Update the endpoints to interact with the Employees table
app.MapGet("/employees", async (ApplicationDbContext db) =>
    await db.Employees.ToListAsync());

app.MapGet("/employees/admins", async (ApplicationDbContext db) =>
    await db.Employees.Where(t => t.is_admin).ToListAsync());

app.MapGet("/employees/{id}", async (int id, ApplicationDbContext db) =>
    await db.Employees.FindAsync(id)
        is Employee employee
            ? Results.Ok(employee)
            : Results.NotFound());

app.MapPost("/employees", async (Employee employee, ApplicationDbContext db) =>
{
    db.Employees.Add(employee);
    await db.SaveChangesAsync();

    return Results.Created($"/employees/{employee.id}", employee);
});

app.MapPut("/employees/{id}", async (int id, Employee inputEmployee, ApplicationDbContext db) =>
{
    var employee = await db.Employees.FindAsync(id);

    if (employee is null) return Results.NotFound();

    employee.firstname = inputEmployee.firstname;
    employee.lastname = inputEmployee.lastname;
    employee.email = inputEmployee.email;
    employee.company_role = inputEmployee.company_role;
    employee.is_admin = inputEmployee.is_admin;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/employees/{id}", async (int id, ApplicationDbContext db) =>
{
    if (await db.Employees.FindAsync(id) is Employee employee)
    {
        db.Employees.Remove(employee);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();
