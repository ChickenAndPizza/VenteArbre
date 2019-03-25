using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_API.Models.Supplier;

namespace Web_API.DataLayer.Mapping.Suppliers
{
    public class SupplierOrderDetailMapping : BaseModelMapping<SupplierOrderDetail>
    {
        public override void Map(EntityTypeBuilder<SupplierOrderDetail> b)
        {

            b.HasOne(c => c.Order).WithMany().HasForeignKey(c => c.IdSupplierOrder);
            b.HasOne(c => c.Tree).WithMany().HasForeignKey(c => c.IdTree);
        }
    }
}
