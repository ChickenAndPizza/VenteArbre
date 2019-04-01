using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_API.Models;

namespace Web_API.DataLayer.Mapping
{
    public class TreeCategoryMapping : BaseModelMapping<TreeCategory>
    {
        public override void Map(EntityTypeBuilder<TreeCategory> b)
        {
            b.HasMany(c => c.Trees).WithOne().HasForeignKey(c => c.IdTreeCategory);
        }
    }
}
