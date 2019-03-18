using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.Models.Base;
using Web_API.Services.Base;

namespace Web_API.Controllers.Base
{
    [Produces("application/json")]
    public abstract class BaseCrudController<TService, TModel> : Controller
            where TModel : BaseModel, new()
            where TService : BaseCrudService<TModel>
    {
        protected readonly TService Service;

        protected BaseCrudController(TService service)
        {
            Service = service;
        }

        [HttpGet]
        [Route("{id:Guid}")]
        [ProducesResponseType(401)]
        [ProducesResponseType(200)]
        public virtual ActionResult Get(Guid id)
        {
            var entity = Service.Get(id);
            return Ok(entity);
        }

        [HttpGet]
        [ProducesResponseType(401)]
        [ProducesResponseType(200)]
        public virtual ActionResult Get()
        {
            var result = Service.GetList();

            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(401)]
        [ProducesResponseType(200)]
        public virtual ActionResult Post([FromBody] TModel entity)
        {
            if (Service.AddOrUpdate(entity) != Guid.Empty)
                return Ok(new { id = entity.Id });

            return BadRequest();
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        [ProducesResponseType(401)]
        [ProducesResponseType(200)]
        public virtual ActionResult Delete(Guid id)
        {
            if (Service.Remove(id))
                return NoContent();

            return BadRequest();
        }
    }
}
