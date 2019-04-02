﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
           var query = Context.TreeCategories.Where(c => c.IsActive == true)
                .Include(c => c.Trees)
                .Select(c => new TreeCategory
                {
                    Id = c.Id,
                    Description = c.Description,
                    Trees = c.Trees.Where(x => x.IsActive).ToList(),
                    IsActive = c.IsActive       
                })
            .OrderBy(c => c.Description)
            .ToList();

            return query;
        }

        public bool IsDescriptionAlreadyUsed(string description)
        {
            return Context.TreeCategories.Any(c => c.Description == description);
        }
    }
}
