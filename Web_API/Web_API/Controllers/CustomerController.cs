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
    public class CustomerController : BaseCrudController<CustomerService, Customer>
    {
        public CustomerController(CustomerService service) : base(service)
        {
        }

        [HttpPost, AllowAnonymous]
        public override ActionResult Post(Customer entity)
        {
            if (Service.AddOrUpdate(entity) != Guid.Empty)
                return Ok(new { id = entity.Id });

            return BadRequest();
        }

        [HttpGet, AllowAnonymous]
        [Route("Email/")]
        public ActionResult<bool> IsEmailAlreadyUsed(string email)
        {
            return Service.IsEmailAlreadyUsed(email);
        }
    }

}
