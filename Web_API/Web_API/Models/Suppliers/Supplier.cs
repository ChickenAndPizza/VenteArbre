using Web_API.Models.Base;

namespace Web_API.Models.Supplier
{
    public class Supplier : BaseModel
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
