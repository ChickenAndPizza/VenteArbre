﻿using System;
using Web_API.Models.Base;

namespace Web_API.Models.Supplier
{
    public class SupplierOrderDetail : BaseModel
    {
        public int Quantity { get; set; }

        public Guid IdSupplierOrder { get; set; }
        public Guid IdTree { get; set; }

        public SupplierOrder Order { get; set; }
        public Tree Tree { get; set; }
    }
}
