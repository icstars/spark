using Microsoft.EntityFrameworkCore;
using SparkAPI.Data;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseMySql(
                builder.Configuration.GetConnectionString("sparkdb"),
                new MySqlServerVersion(new Version(8, 0, 2)) // Specify the MySQL server version
            ));

        var app = builder.Build();

        app.MapGet("/user", async (ApplicationDbContext dbContext) =>
{
    // Retrieve all employees from the database
    var employees = await dbContext.user.ToListAsync();

    // Return the list of employees as JSON
    return Results.Ok(employees);
});

        app.Run();
    }
}