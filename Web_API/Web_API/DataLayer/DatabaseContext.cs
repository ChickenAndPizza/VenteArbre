using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using Web_API.DataLayer.Mapping;
using Web_API.Models;
using Web_API.Models.Base;
using Web_API.Models.Supplier;

namespace Web_API.DataLayer
{
    public class DatabaseContext : DbContext, IDatabaseContext
    {

        public DbSet<Customer> Customers { get; set; }
        public DbSet<CustomerOrder> CustomerOrders { get; set; }
        public DbSet<CustomerOrderDetail> CustomerOrderDetails { get; set; }

        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<SupplierOrder> SupplierOrders { get; set; }
        public DbSet<SupplierOrderDetail> SupplierOrderDetails { get; set; }

        public DbSet<Tree> Trees { get; set; }
        public DbSet<TreeCategory> TreeCategories { get; set; }
        public DbSet<TreeSubCategory> TreeSubCategories { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

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
