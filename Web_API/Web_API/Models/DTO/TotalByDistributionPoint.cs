﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_API.Models.DTO
{
    public class TotalByDistributionPoint
    {
        public Guid IdDistributionPoint { get; set; }
        public String DistributionPointName { get; set; }
        public int DistributionPointTotal { get; set; }
    }
}