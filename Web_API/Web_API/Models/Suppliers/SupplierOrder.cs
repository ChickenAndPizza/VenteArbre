using System;
using System.Collections.Generic;
using Web_API.Models.Base;

namespace Web_API.Models.Supplier
{
    public class SupplierOrder : BaseModel
    {
        public DateTime TransactionDate { get; set; }

        public string IdCustomer { get; set; }
        public string IdSupplier { get; set; }

        public Customer Customer { get; set; }
        public Supplier Supplier { get; set; }
        public ICollection<SupplierOrderDetail> OrderDetails { get; set; }
    }
}
