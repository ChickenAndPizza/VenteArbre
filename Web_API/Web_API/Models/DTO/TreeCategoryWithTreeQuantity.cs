using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.Models.Base;

namespace Web_API.Models.DTO
{
    public class TreeCategoryWithTreeQuantity : BaseModel
    {
        public string Description { get; set; }

        public List<TreeWithQuantity> Trees { get; set; }
    }
}
