using System.Linq;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class DashboardDescriptionService : BaseCrudService<DashboardDescription>
    {

        public DashboardDescriptionService(IDatabaseContext context) : base(context)
        {
        }

        public DashboardDescription GetDashboardDescription()
        {
            return Context.DashboardDescriptions.FirstOrDefault(c => c.IsActive);
        }
    }
}
