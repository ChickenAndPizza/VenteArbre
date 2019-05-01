using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Web_API.Controllers.Base;
using Web_API.Models.Supplier;
using Web_API.Services;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    public class SupplierController : BaseCrudController<SupplierService, Supplier>
    {
        public SupplierController(SupplierService service) : base(service)
        {
        }

        [HttpPost]
        public override ActionResult Post(Supplier entity)
        {
            if (entity.PhoneNumber.Length != 10)
            {
                var newPhoneNumber = entity.PhoneNumber;
                newPhoneNumber = newPhoneNumber.Replace('-', ' ');
                newPhoneNumber = newPhoneNumber.Replace('(', ' ');
                newPhoneNumber = newPhoneNumber.Replace(')', ' ');
                newPhoneNumber = newPhoneNumber.Replace(" ", string.Empty);
                entity.PhoneNumber = newPhoneNumber;
            }

            if (Service.AddOrUpdate(entity) != Guid.Empty)
                return Ok(entity);

            return BadRequest();
        }

        [HttpGet]
        [Route("GetSuppliers")]
        public ActionResult<List<Supplier>> GetSuppliers()
        {
            return Service.GetSuppliers();
        }
    }
}
