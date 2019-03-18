using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_API.Models;

namespace Web_API.DataLayer.Mapping
{
    public class CustomerOrderDetailMapping : BaseModelMapping<CustomerOrderDetail>
    {
        public override void Map(EntityTypeBuilder<CustomerOrderDetail> b)
        {
            b.HasOne(c => c.Tree).WithMany().HasForeignKey(c => c.IdTree);
            b.HasOne(c => c.Order).WithMany().HasForeignKey(c => c.IdCustomerOrder);
        }
    }
}
