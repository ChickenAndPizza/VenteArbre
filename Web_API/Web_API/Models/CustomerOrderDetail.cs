using System;
using Web_API.Models.Base;

namespace Web_API.Models
{
    public class CustomerOrderDetail : BaseModel
    {
        public int Quantity { get; set; }
        public Decimal Price { get; set; }

        public Guid IdTree { get; set; }
        public Guid IdCustomerOrder { get; set; }

        public Tree Tree { get; set; }
        public CustomerOrder Order { get; set; }
    }
}
