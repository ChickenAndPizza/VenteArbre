using System;
using Web_API.Models.Base;

namespace Web_API.Models
{
    public class Tree : BaseModel
    {
        public string Name { get; set; }
        public string Zone { get; set; }
        public string AgeHeight { get; set; }
        public Decimal Price { get; set; }
        public string Description { get; set; }
        //public byte[] Image { get; set; }

        public Guid IdTreeCategory { get; set; }

    }
}
