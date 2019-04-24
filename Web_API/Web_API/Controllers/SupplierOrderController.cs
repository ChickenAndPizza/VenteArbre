using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Web_API.Controllers.Base;
using Web_API.Models.Supplier;
using Web_API.Services;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    public class SupplierOrderController : BaseCrudController<SupplierOrderService, SupplierOrder>
    {
        public SupplierOrderController(SupplierOrderService service) : base(service)
        {
        }

        [HttpGet, AllowAnonymous]
        [Route("CreateSupplierOrder")]
        public ActionResult CreateSupplierOrder(Guid idCustomer, Guid idSupplier)
        {
            return Ok(Service.CreateSupplierOrder(idCustomer, idSupplier));
        }

        [HttpGet]
        [Route("GetPreviousSupplierOrders")]
        public ActionResult GetPreviousSupplierOrders()
        {
            return Ok(Service.GetPreviousSupplierOrders());
        }
    }
}
