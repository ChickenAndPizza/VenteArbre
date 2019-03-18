using System;
using System.Collections.Generic;
using Web_API.Models.Base;
using Web_API.Models.Enum;

namespace Web_API.Models
{
    public class CustomerOrder : BaseModel
    {
        public DateTime TransactionDate { get; set; }
        public Order State { get; set; }

        public string IdCustomer { get; set; }

        public Customer Customer { get; set; }
        public ICollection<CustomerOrderDetail> OrderDetails { get; set; }
    }
}
