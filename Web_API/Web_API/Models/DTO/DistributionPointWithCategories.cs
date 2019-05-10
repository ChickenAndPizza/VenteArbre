using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_API.Models.DTO
{
    public class DistributionPointWithCategories
    {
        public Guid IdDistributionPoint { get; set; }
        public String DistributionPointName { get; set; }

        public List<TotalByCategory> TotalByCategories { get; set; }
    }
}
