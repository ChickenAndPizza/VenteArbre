﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_API.Models;

namespace Web_API.DataLayer.Mapping
{
    public class TreeSubCategoryMapping : BaseModelMapping<TreeSubCategory>
    {
        public override void Map(EntityTypeBuilder<TreeSubCategory> b)
        {
            b.HasMany(c => c.Trees).WithOne().HasForeignKey(c => c.IdTreeSubCategory);
        }
    }
}