using Microsoft.AspNetCore.Authorization;
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
    public class CustomerOrderController : BaseCrudController<CustomerOrderService, CustomerOrder>
    {
        public CustomerOrderController(CustomerOrderService service) : base(service)
        {
        }

        [HttpGet, AllowAnonymous]
        [Route("{id:Guid}")]
        [ProducesResponseType(401)]
        [ProducesResponseType(200)]
        public override ActionResult Get(Guid id)
        {
            var entity = Service.GetCustomerCart(id);
            if(entity != null)
                return Ok(entity);
            return NoContent();
        }

        [HttpGet, AllowAnonymous]
        [Route("CreateCart/{id:Guid}")]
        public ActionResult<CustomerOrder> CreateCart(Guid id)
        {
            var cart = Service.CreateCart(id);
            return Ok(cart);
        }
    }
}
