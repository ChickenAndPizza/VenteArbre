using Web_API.Models.Base;

namespace Web_API.Models
{
    public class CustomerOrderDetail : BaseModel
    {
        public int Quantity { get; set; }

        public string IdTree { get; set; }
        public string IdCustomerOrder { get; set; }

        public Tree Tree { get; set; }
        public CustomerOrder Order { get; set; }
    }
}
