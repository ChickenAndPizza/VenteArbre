using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_API.Models.DTO
{
    public class TotalByTree
    {
        public Guid IdCategory { get; set; }
        public String TreeName { get; set; }

        public int TreeTotal { get; set; }
        
    }
}
