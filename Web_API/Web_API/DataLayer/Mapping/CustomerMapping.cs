using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_API.Models;

namespace Web_API.DataLayer.Mapping
{
    public class CustomerMapping : BaseModelMapping<Customer>
    {
        public override void Map(EntityTypeBuilder<Customer> b)
        { }
    }
}
