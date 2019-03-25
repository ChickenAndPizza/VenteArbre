using Microsoft.EntityFrameworkCore;
using Web_API.DataLayer.Mapping.Base;
using Web_API.Models.Base;

namespace Web_API.DataLayer.Mapping
{
    public abstract class BaseModelMapping<T> : EntityMappingConfiguration<T>
        where T : BaseModel
    {
        public override void Map(ModelBuilder b)
        {
            b.Entity<T>().HasKey(m => m.Id);
            b.Entity<T>().Property(m => m.Id).ValueGeneratedNever();
            Map(b.Entity<T>());
        }
    }
}
