using System;
using System.Collections.Generic;
using Web_API.Models.Base;
using Web_API.Models.Enum;

namespace Web_API.Models
{
    public class CustomerOrder : BaseModel
    {
        public DateTime? TransactionDate { get; set; }
        public Order State { get; set; }
        public Decimal Total { get; set; }

        public Guid IdCustomer { get; set; }
        public Guid? IdDistributionPoint { get; set; }
        public Guid? IdSupplierOrder { get; set; }

        public Customer Customer { get; set; }
        public DistributionPoint DistributionPoint { get; set; }
        public ICollection<CustomerOrderDetail> OrderDetails { get; set; }
    }
}
