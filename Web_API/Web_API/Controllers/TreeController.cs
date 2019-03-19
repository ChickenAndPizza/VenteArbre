using Microsoft.AspNetCore.Mvc;
using Web_API.Controllers.Base;
using Web_API.Models;
using Web_API.Services;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    public class TreeController : BaseCrudController<TreeService, Tree>
    {
        public TreeController(TreeService service) : base(service)
        {
        }
    }
}
