using Microsoft.EntityFrameworkCore;
using System.Linq;
using Web_API.DataLayer.Mapping;
using Web_API.Models;
using Web_API.Models.Base;

namespace Web_API.DataLayer
{
    public class DatabaseContext : DbContext, IDatabaseContext
    {

        public DbSet<Customer> Customers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseAutoSnakeCaseMapping();
            this.UseAutoDetectedMappings(modelBuilder);
        }

        public override int SaveChanges()
        {
            foreach (var dbEntityEntry in ChangeTracker
                .Entries<BaseModel>()
                .Where(x => x.State == EntityState.Modified || x.State == EntityState.Added));

            return base.SaveChanges();
        }
    }
}
