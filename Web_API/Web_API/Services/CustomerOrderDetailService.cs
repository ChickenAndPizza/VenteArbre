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
    public class CustomerOrderDetailService : BaseCrudService<CustomerOrderDetail>
    {
        public CustomerOrderDetailService(IDatabaseContext context) : base(context)
        {
        }

        public override Guid AddOrUpdate(CustomerOrderDetail entity)
        {
            var isExistRecord = Context.CustomerOrderDetails.Any(c => c.Id == entity.Id);
            var cart = Context.CustomerOrders.Include(x => x.OrderDetails).AsNoTracking().FirstOrDefault(c => c.Id == entity.IdCustomerOrder && c.State == Order.Cart);
            if (cart.OrderDetails.Any(c => c.IdTree == entity.IdTree))
            {
                var orderDetail = cart.OrderDetails.FirstOrDefault(c => c.IdTree == entity.IdTree);
                orderDetail.Quantity = entity.Quantity;
                Context.CustomerOrderDetails.Update(orderDetail);
            } else if (isExistRecord)
                Context.CustomerOrderDetails.Update(entity);
            else
                Context.CustomerOrderDetails.Add(entity);

            Context.SaveChanges();
            return entity.Id;
        }

        public override bool Remove(Guid id)
        {
            var entity = Context.Set<CustomerOrderDetail>().Find(id);

            if (entity == null)
                return false;
            Context.CustomerOrderDetails.Remove(entity);

            Context.SaveChanges();

            return true;
        }
    }
}
