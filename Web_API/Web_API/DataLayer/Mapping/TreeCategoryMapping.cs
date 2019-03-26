using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_API.Models;

namespace Web_API.DataLayer.Mapping
{
    public class TreeCategoryMapping : BaseModelMapping<TreeCategory>
    {
        public override void Map(EntityTypeBuilder<TreeCategory> b)
        {
            b.HasMany(c => c.TreeSubCategories).WithOne(c => c.TreeCategory).HasForeignKey(c => c.IdTreeCategory);
        }
    }
}
