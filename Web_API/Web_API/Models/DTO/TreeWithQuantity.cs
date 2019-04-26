using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.Models.Base;

namespace Web_API.Models.DTO
{
    public class TreeWithQuantity : BaseModel
    {
        public string Name { get; set; }
        public string Zone { get; set; }
        public string AgeHeight { get; set; }
        public Decimal Price { get; set; }
        public string Description { get; set; }
        public int Maximum { get; set; }
        public byte[] Image { get; set; }
        public int Quantity { get; set; }

        public Guid IdTreeCategory { get; set; }

    }
}
