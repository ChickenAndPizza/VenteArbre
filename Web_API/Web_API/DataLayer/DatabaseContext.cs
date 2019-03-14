using Microsoft.EntityFrameworkCore;
using Web_API.DataLayer.Mapping;

namespace Web_API.DataLayer
{
    public class DatabaseContext : DbContext
    {


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseAutoSnakeCaseMapping();
            this.UseAutoDetectedMappings(modelBuilder);
        }
    }
}
