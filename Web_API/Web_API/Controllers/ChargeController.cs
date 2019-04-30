using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    public class ChargeController : Controller
    {

        [HttpPost]
        public ActionResult Create(string stripeToken)
        {

            return Ok();
        }
    }
}
