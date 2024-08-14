using Microsoft.EntityFrameworkCore;

namespace SparkAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> user { get; set; }
        // Add other DbSet properties for your tables
    }

    public class Employee
    {
        public int? id { get; set; }
        public int? manager_id { get; set; }
        public int? department_id { get; set; }
        public string? email { get; set; }
        public DateTime? hired_date { get; set; }
        public string? company_role { get; set; }
        public string? username { get; set; }
        public string? password { get; set; }
        public bool? is_admin { get; set; }
        public string? firstname { get; set; }
        public string? lastname { get; set; }   
    }
}
