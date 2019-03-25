﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.Controllers.Base;
using Web_API.Models.Supplier;
using Web_API.Services;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    public class SupplierOrderDetailController : BaseCrudController<SupplierOrderDetailService, SupplierOrderDetail>
    {
        public SupplierOrderDetailController(SupplierOrderDetailService service) : base(service)
        {
        }
    }
}
