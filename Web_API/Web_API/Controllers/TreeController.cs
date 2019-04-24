using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Web_API.Controllers.Base;
using Web_API.Models;
using Web_API.Models.DTO;
using Web_API.Services;
using System.Web.Http;
using System.IO;

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
        public ActionResult<bool> IsDescriptionAlreadyUsed(string description, Guid categoryId, string treeId)
        {
            return Service.IsDescriptionAlreadyUsedForCategory(description, categoryId, treeId);
        }

        [HttpGet, AllowAnonymous]
        [Route("{id:Guid}")]
        public override ActionResult Get(Guid id)
        {
            var entity = Service.Get(id);
            return Ok(entity);
        }

        [HttpGet, AllowAnonymous]
        [Route("RandomTrees")]
        public ActionResult GetRandomTree()
        {
            return Ok(Service.GetRandomTrees());
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("Image")]
        public ActionResult UploadImage()
        {
            var file = Request.Form.Files[0];
            var treeId = Request.Form["treeId"];

            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                byte[] fileBytes = ms.ToArray();
                Service.UploadImageToDatabase(fileBytes, Guid.Parse(treeId));
            }

            return Ok();
        }

        [HttpGet]
        [Route("ValidateCustomerOrderDetail/{idTree:Guid}/{number:int}")]
        public ActionResult ValidateCustomerOrderDetail(Guid idTree, int number)
        {
            return Ok(Service.CustomerCanOrder(idTree, number));
        }

        [HttpGet]
        [Route("GetRemainingQuantityForTree/{idTree:Guid}")]
        public ActionResult GetRemainingQuantityForTree(Guid idTree)
        {
            return Ok(Service.CustomerCannotOrderReturnRemaining(idTree));
        }
    }
}
