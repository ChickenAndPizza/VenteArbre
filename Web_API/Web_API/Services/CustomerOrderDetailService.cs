using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class CustomerOrderDetailService : BaseCrudService<CustomerOrderDetail>
    {
        public CustomerOrderDetailService(IDatabaseContext context) : base(context)
        {
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
