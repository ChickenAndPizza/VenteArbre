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
    public class DistributionPointController : BaseCrudController<DistributionPointService, DistributionPoint>
    {
        public DistributionPointController(DistributionPointService service) : base(service)
        {
        }

        [HttpGet, AllowAnonymous]
        [ProducesResponseType(401)]
        [ProducesResponseType(200)]
        public override ActionResult Get()
        {
            var result = Service.GetList();

            return Ok(result);
        }
    }
}
