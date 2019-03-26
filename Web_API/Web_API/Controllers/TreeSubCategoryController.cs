using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.Controllers.Base;
using Web_API.Models;
using Web_API.Services;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    public class TreeSubCategoryController : BaseCrudController<TreeCategoryService, TreeCategory>
    {
        public TreeSubCategoryController(TreeCategoryService service) : base(service)
        {
        }
    }
}
