using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Web_API.DataLayer;
using Web_API.Models.Supplier;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class SupplierOrderService : BaseCrudService<SupplierOrder>
    {
        public SupplierOrderService(IDatabaseContext context) : base(context)
        {
        }

        public Guid CreateSupplierOrder(Guid idCustomer, Guid idSupplier)
        {
            var newSupplierOrder = new SupplierOrder
            {
                TransactionDate = DateTime.Now,
                IdCustomer = idCustomer,
                IdSupplier = idSupplier
            };
            Context.SupplierOrders.Add(newSupplierOrder);
            Context.SaveChanges();

            return newSupplierOrder.Id;
        }

        public List<SupplierOrder> GetPreviousSupplierOrders()
        {
            var query = Context.SupplierOrders.Where(c => c.IsActive)
                 .Include(c => c.OrderDetails)
                 .Select(c => new SupplierOrder
                 {
                     Id = c.Id,
                     TransactionDate = c.TransactionDate,
                     IdCustomer = c.IdCustomer,
                     IdSupplier = c.IdSupplier,
                     Customer = c.Customer,
                     Supplier = c.Supplier,
                     OrderDetails = c.OrderDetails.Where(x => x.IsActive).Select(y => new SupplierOrderDetail
                     {
                         Id = y.Id,
                         Quantity = y.Quantity,
                         IdSupplierOrder = y.IdSupplierOrder,
                         IdTree = y.IdTree,
                         Order = y.Order,
                         Tree = y.Tree,
                     }).ToList(),
                 })
             .OrderBy(c => c.Customer.LastName)
             .ToList();

            return query;
        }


        
    }
}
