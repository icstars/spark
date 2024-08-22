using Microsoft.EntityFrameworkCore;
using spark;

    public class SparkDb : DbContext
    {
        public SparkDb(DbContextOptions<SparkDb> options)
            : base(options)
        {
        }

        public DbSet<User> user => Set<User>();
        public DbSet<Department> department => Set<Department>();
        // Add other DbSet properties for your tables
    }

    

