using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_API.Models.Supplier;

namespace Web_API.DataLayer.Mapping.Suppliers
{
    public class SupplierOrderMapping : BaseModelMapping<SupplierOrder>
    {
        public override void Map(EntityTypeBuilder<SupplierOrder> b)
        {
            b.HasOne(c => c.Customer).WithMany().HasForeignKey(c => c.IdCustomer);
            b.HasOne(c => c.Supplier).WithMany().HasForeignKey(c => c.IdSupplier);
            b.HasMany(c => c.OrderDetails).WithOne(c => c.Order).HasForeignKey(c => c.IdSupplierOrder);
        }
    }
}
