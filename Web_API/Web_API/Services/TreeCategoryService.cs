﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class TreeCategoryService : BaseCrudService<TreeCategory>
    {
        public TreeCategoryService(IDatabaseContext context) : base(context)
        {
        }

        public List<TreeCategory> GetCategoryWithSubCategory()
        {
            var test = Context.TreeCategories.Include(c => c.TreeSubCategories).ToList();
            return test;
        }
    }
}
