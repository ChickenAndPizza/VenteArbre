using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_API.Models;

namespace Web_API.DataLayer.Mapping
{
    public class CustomerOrderMapping : BaseModelMapping<CustomerOrder>
    {
        public override void Map(EntityTypeBuilder<CustomerOrder> b)
        {
            b.HasOne(c => c.Customer).WithMany().HasForeignKey(c => c.IdCustomer);
            b.HasMany(c => c.OrderDetails).WithOne(c => c.Order).HasForeignKey(c => c.IdCustomerOrder);
            b.HasOne(c => c.DistributionPoint).WithMany().HasForeignKey(c => c.IdDistributionPoint);
        }
    }
}
