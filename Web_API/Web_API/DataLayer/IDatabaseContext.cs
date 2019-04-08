using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Web_API.Models;
using Web_API.Models.Supplier;

namespace Web_API.DataLayer
{
    public interface IDatabaseContext
    {
        DbSet<Customer> Customers { get; set; }
        DbSet<CustomerOrder> CustomerOrders { get; set; }
        DbSet<CustomerOrderDetail> CustomerOrderDetails { get; set; }

        DbSet<Supplier> Suppliers { get; set; }
        DbSet<SupplierOrder> SupplierOrders { get; set; }
        DbSet<SupplierOrderDetail> SupplierOrderDetails { get; set; }

        DbSet<Tree> Trees { get; set; }
        DbSet<TreeCategory> TreeCategories { get; set; }

        DbSet<DistributionPoint> DistributionPoints { get; set; }

        DbSet<TEntity> Set<TEntity>() where TEntity : class;
        EntityEntry<TEntity> Add<TEntity>(TEntity entity) where TEntity : class;
        EntityEntry Update(object entity);
        EntityEntry Remove(object entity);
        void RemoveRange(params object[] entities);
        TEntity Find<TEntity>(params object[] keyValues) where TEntity : class;
        int SaveChanges();

        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
    }
}
