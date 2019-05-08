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
        [Route("Order/{id:Guid}/{idDistributionPoint:Guid}")]
        public ActionResult Order(Guid id, Guid idDistributionPoint)
        {
            return Ok(Service.OrderObjectInsideCart(id, idDistributionPoint));
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
        public ActionResult GetOrders(Order state)
        {
            return Ok(Service.GetOrders(state));
        }

        [HttpGet]
        [Route("GetTotalByCategory")]
        public ActionResult GetTotalByCategory(Order state)
        {
            return Ok(Service.GetTotalByCategory(state));
        }

        [HttpGet]
        [Route("GetTotalByDistributionPoint")]
        public ActionResult GetTotalByDistributionPoint(Order state)
        {
            return Ok(Service.GetTotalByDistributionPoint(state));
        }

        [HttpGet]
        [Route("GetTotalByCategoryOfDistributionPoint")]
        public ActionResult GetTotalByCategoryOfDistributionPoint(Order state)
        {
            return Ok(Service.GetTotalByCategoryOfDistributionPoint(state));
        }

        [HttpGet]
        [Route("GetTotalByAll")]
        public ActionResult GetTotalByAll(Order state)
        {
            return Ok(Service.GetTotalByAll(state));
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

        [HttpGet]
        [Route("GetPreviousCustomerOrders")]
        public ActionResult GetPreviousCustomerOrders(Guid customerId)
        {
            return Ok(Service.GetPreviousCustomerOrders(customerId));
        }

        [HttpGet]
        [Route("GetCustomerOrder")]
        public ActionResult<CustomerOrder> GetCustomerOrder(Guid customerOrderId)
        {
            return Service.GetCustomerOrder(customerOrderId);
        }

        [HttpGet]
        [Route("GetTotalOrdersOfSupplierOrder")]
        public ActionResult GetTotalOrdersOfSupplierOrder(Guid supplierOrderId)
        {
            return Ok(Service.GetTotalOrdersOfSupplierOrder(supplierOrderId));
        }

        [HttpGet]
        [Route("GetTotalOrdersNotShippedOfSupplierOrder")]
        public ActionResult GetTotalOrdersNotShippedOfSupplierOrder(Guid supplierOrderId)
        {
            return Ok(Service.GetTotalOrdersNotShippedOfSupplierOrder(supplierOrderId));
        }

        [HttpGet]
        [Route("GetOrdersOfSupplierOrder")]
        public ActionResult GetOrdersOfSupplierOrder(Guid supplierOrderId)
        {
            return Ok(Service.GetOrdersOfSupplierOrder(supplierOrderId));
        }
    }
}
