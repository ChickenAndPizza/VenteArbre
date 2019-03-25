using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_API.Models.Supplier;

namespace Web_API.DataLayer.Mapping.Suppliers
{
    public class SupplierMapping : BaseModelMapping<Supplier>
    {
        public override void Map(EntityTypeBuilder<Supplier> b)
        { }
    }
}
