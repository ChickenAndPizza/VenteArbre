using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_API.Models.DTO
{
    public class TotalByCategory
    {
        public Guid IdCategory { get; set; }
        public String CategoryName { get; set; }

        public int CategoryTotal { get; set; }
        
        public List<TotalByTree> TreesByCategory { get; set; }
    }
}
