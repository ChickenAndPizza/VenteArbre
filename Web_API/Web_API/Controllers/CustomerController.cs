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

        [HttpGet]
        public ActionResult GetList()
        {
            return Ok(Service.GetList());
        }
    }

}
