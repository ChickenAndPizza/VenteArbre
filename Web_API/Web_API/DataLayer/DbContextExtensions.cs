using Microsoft.EntityFrameworkCore;
using Web_API.DataLayer.Mapping.Base;

namespace Web_API.DataLayer
{
    public static class DbContextExtensions
    {
        public static void UseAutoDetectedMappings(this DbContext context, ModelBuilder builder)
        {
            builder.AddEntityConfigurationsFromAssembly(context.GetType().Assembly);
        }
    }
}
