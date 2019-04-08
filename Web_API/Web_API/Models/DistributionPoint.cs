using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.Models.Base;

namespace Web_API.Models
{
    public class DistributionPoint : BaseModel
    {
        public string MapLink { get; set; }
        public string WebLink { get; set; }
        public string WebName { get; set; }
        public string Description { get; set; }
    }
}
