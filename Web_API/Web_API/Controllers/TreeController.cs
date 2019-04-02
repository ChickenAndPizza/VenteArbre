using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
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

        [HttpGet, AllowAnonymous]
        [Route("Description")]
        public ActionResult<bool> IsDescriptionAlreadyUsed(string description, Guid categoryId)
        {
            return Service.IsDescriptionAlreadyUsedForCategory(description, categoryId);
        }
    }
}
