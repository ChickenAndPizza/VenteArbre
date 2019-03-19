using Web_API.Models.Base;

namespace Web_API.Models.Supplier
{
    public class SupplierOrderDetail : BaseModel
    {
        public int Quantity { get; set; }

        public string IdSupplierOrder { get; set; }
        public string IdTree { get; set; }

        public SupplierOrder Order { get; set; }
        public Tree Tree { get; set; }
    }
}
