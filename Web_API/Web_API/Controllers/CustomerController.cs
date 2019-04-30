using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Web_API.Controllers.Base;
using Web_API.Models;
using Web_API.Models.DTO;
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
            if(entity.PhoneNumber.Length != 10)
            {
                var newPhoneNumber = entity.PhoneNumber;
                newPhoneNumber = newPhoneNumber.Replace('-', ' ');
                newPhoneNumber = newPhoneNumber.Replace('(', ' ');
                newPhoneNumber = newPhoneNumber.Replace(')', ' ');
                newPhoneNumber = newPhoneNumber.Replace(" ", String.Empty);
                entity.PhoneNumber = newPhoneNumber;
            }

            if (Service.AddOrUpdate(entity) != Guid.Empty)
                return Ok(entity);

            return BadRequest();
        }

        [HttpGet, AllowAnonymous]
        [Route("Email/")]
        public ActionResult<bool> IsEmailAlreadyUsed(string id, string email)
        {
            return Service.IsEmailAlreadyUsed(id, email);
        }

        [HttpGet]
        [Route("SetAdministrator")]
        public ActionResult<string> SetAdministrator(string email)
        {
            return Service.SetAdministrator(email);
        }

        [HttpGet]
        [Route("DeleteAdministrator")]
        public ActionResult<string> DeleteAdministrator(Guid id)
        {
            return Service.DeleteAdministrator(id);
        }

        [HttpGet]
        [Route("GetAdministrators")]
        public ActionResult<List<TempCustomer>> GetAdministrators()
        {
            return Service.GetAdministrators();
        }
    }

}
