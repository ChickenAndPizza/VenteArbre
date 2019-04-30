using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Web_API.Controllers.Base;
using Web_API.Models;
using Web_API.Models.Enum;
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

        [HttpGet]
        [Route("Command/{id:Guid}/{idDistributionPoint:Guid}")]
        public ActionResult Command(Guid id, Guid idDistributionPoint)
        {
            return Ok(Service.CommandObjectInsideCart(id, idDistributionPoint));
        }

        [HttpGet]
        [Route("GetTotalOrdersInProgress")]
        public ActionResult GetTotalOrdersInProgress()
        {
            return Ok(Service.GetTotalOrdersInProgress());
        }

        [HttpGet]
        [Route("Get72hOrdersInProgress")]
        public ActionResult Get72hOrdersInProgress()
        {
            return Ok(Service.Get72hOrdersInProgress());
        }

        [HttpGet]
        [Route("GetOrders")]
        public ActionResult GetOrders(Order order)
        {
            return Ok(Service.GetOrders(order));
        }

        [HttpGet]
        [Route("GetTotalByCategory")]
        public ActionResult GetTotalByCategory()
        {
            return Ok(Service.GetTotalByCategory());
        }

        [HttpGet]
        [Route("GetTotalByDistributionPoint")]
        public ActionResult GetTotalByDistributionPoint()
        {
            return Ok(Service.GetTotalByDistributionPoint());
        }

        [HttpGet]
        [Route("GetTotalByAll")]
        public ActionResult GetTotalByAll()
        {
            return Ok(Service.GetTotalByAll());
        }

        [HttpGet]
        [Route("GetTotalOrdersProcessed")]
        public ActionResult GetTotalOrdersProcessed()
        {
            return Ok(Service.GetTotalOrdersProcessed());
        }
        
        [HttpGet]
        [Route("SetOrdersInProgressInProcess")]
        public ActionResult SetOrdersInProgressInProcess(Guid idSupplierOrder)
        {
            return Ok(Service.SetOrdersInProgressInProcess(idSupplierOrder));
        }

        [HttpGet]
        [Route("SetOrdersInProcessProcessed")]
        public ActionResult SetOrdersInProcessProcessed()
        {
            return Ok(Service.SetOrdersInProcessProcessed());
        }

        [HttpPost]
        [Route("SetProcessedOrdersToShipped")]
        public ActionResult SetProcessedOrdersToShipped([FromBody] List<Guid> ordersShipped)
        {
            return Ok(Service.SetProcessedOrdersToShipped(ordersShipped));
        }

        [HttpGet]
        [Route("GetTotalOrdersForCustomer")]
        public ActionResult GetTotalOrdersForCustomer(Guid customerId)
        {
            return Ok(Service.GetTotalOrdersForCustomer(customerId));
        }

        [HttpGet]
        [Route("CancelProcessOfOrders")]
        public ActionResult CancelProcessOfOrders()
        {
            return Ok(Service.CancelProcessOfOrders());
        }
    }
}
