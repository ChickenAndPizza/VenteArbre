using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_API.Controllers.Base;
using Web_API.Models;
using Web_API.Services;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    public class DashboardDescriptionController : BaseCrudController<DashboardDescriptionService, DashboardDescription>
    {
        public DashboardDescriptionController(DashboardDescriptionService service) : base(service)
        {
        }

        [HttpGet, AllowAnonymous]
        [Route("GetDashboardDescription")]
        public ActionResult GetDashboardDescription()
        {
            return Ok(Service.GetDashboardDescription());
        }
    }
}
