using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
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
        [Route("GetCategoriesWithTrees")]
        public ActionResult<List<TreeCategory>> GetCategoriesWithTrees()
        {
            return Ok(Service.GetCategoryWithTrees());
        }

        [HttpGet, AllowAnonymous]
        [Route("Description")]
        public ActionResult<bool> IsDescriptionAlreadyUsed(string description, string categoryId)
        {
            return Service.IsDescriptionAlreadyUsed(description, categoryId);
        }

        [HttpGet, AllowAnonymous]
        [Route("GetDescription")]
        public ActionResult<string> GetDescription(Guid categoryId)
        {
            return Service.GetDescription(categoryId);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        [ProducesResponseType(401)]
        [ProducesResponseType(200)]
        public override ActionResult Delete(Guid id)
        {
            if (Service.RemoveWithChildren(id))
                return NoContent();

            return BadRequest();
        }
    }
}
