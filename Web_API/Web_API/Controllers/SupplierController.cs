using Microsoft.AspNetCore.Mvc;
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
    }
}
