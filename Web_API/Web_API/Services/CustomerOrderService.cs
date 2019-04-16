using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Models.Enum;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class CustomerOrderService : BaseCrudService<CustomerOrder>
    {
        public CustomerOrderService(IDatabaseContext context) : base(context)
        {
        }

        public CustomerOrder GetCustomerCart(Guid id)
        {
            return Context.CustomerOrders
                 .Include(c => c.OrderDetails)
                 .ThenInclude(detail => detail.Tree)
                 .Where(c => c.IdCustomer == id && c.IsActive == true && c.State == 0)
                 .Select(c => new CustomerOrder
                 {
                     Id = c.Id,
                     State = c.State,
                     IdCustomer = c.IdCustomer,
                     OrderDetails = c.OrderDetails.Where(x => x.IsActive).Select(y => new CustomerOrderDetail
                     {
                         Id = y.Id,
                         Quantity = y.Quantity,
                         IdTree = y.IdTree,
                         Tree = y.Tree,
                         IdCustomerOrder = c.Id
                     }).ToList(),
                     IsActive = c.IsActive,
                 }).ToList().FirstOrDefault();
        }

        public Guid CommandObjectInsideCart(Guid idOrder)
        {
            var cart = Context.CustomerOrders.FirstOrDefault(c => c.Id == idOrder && c.State == Order.Cart);
            cart.State = Order.Paid;
            cart.TransactionDate = DateTime.Now;
            Context.Update(cart);
            Context.SaveChanges();
            return cart.Id;
        }

        public CustomerOrder CreateCart(Guid id)
        {
            var customerCart = new CustomerOrder
            {
                IdCustomer = id,
                State = Order.Cart,
            };
            Context.CustomerOrders.Add(customerCart);
            Context.SaveChanges();
            return customerCart;
        }
    }
}
