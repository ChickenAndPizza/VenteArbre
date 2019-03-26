using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Web_API.Controllers.Base;
using Web_API.Models;
using Web_API.Services;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    public class TreeCategoryController : BaseCrudController<TreeCategoryService, TreeCategory>
    {
        public TreeCategoryController(TreeCategoryService service) : base(service)
        {
        }

        [HttpGet, AllowAnonymous]
        [Route("GetCategoriesAndSubCategories")]
        public ActionResult<List<TreeCategory>> GetCategoriesAndSubCategories()
        {
            return Ok(Service.GetCategoryWithSubCategory());
        }
    }
}
