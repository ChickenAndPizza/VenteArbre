using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.DataLayer;
using Web_API.Models.Supplier;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class SupplierService : BaseCrudService<Supplier>
    {
        public SupplierService(IDatabaseContext context) : base(context)
        {
        }
    }
}
