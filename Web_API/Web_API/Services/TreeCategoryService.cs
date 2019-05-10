using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Models.DTO;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class TreeCategoryService : BaseCrudService<TreeCategory>
    {
        private readonly TreeService treeService;

        public TreeCategoryService(IDatabaseContext context, TreeService treeService) : base(context)
        {
            this.treeService = treeService;
        }

        public List<TreeCategoryWithTreeQuantity> GetCategoryWithTrees()
        {
            var query = Context.TreeCategories.Where(c => c.IsActive == true)
                 .Include(c => c.Trees)
                 .Select(c => new TreeCategoryWithTreeQuantity
                 {
                     Id = c.Id,
                     Description = c.Description,
                     Trees = c.Trees.Where(x => x.IsActive).Select(x => new TreeWithQuantity
                     {
                         Id = x.Id,
                         IdTreeCategory = x.IdTreeCategory,
                         AgeHeight = x.AgeHeight,
                         Description = x.Description,
                         Image = x.Image,
                         IsActive = x.IsActive,
                         Name = x.Name,
                         Price = x.Price,
                         Zone = x.Zone,
                         Maximum = x.Maximum
                     }).ToList(),
                     IsActive = c.IsActive
                 }).ToList();
            foreach(var category in query)
            {
                foreach(var tree in category.Trees)
                {
                    tree.Quantity = treeService.CustomerCannotOrderReturnRemaining(tree.Id);
                }
            }
            query = query.OrderBy(c => c.Description)
                    .ToList();

            return query;
        }

        public bool IsDescriptionAlreadyUsed(string description, string categoryId)
        {
            if (!string.IsNullOrWhiteSpace(categoryId) && Context.TreeCategories.Any(c => c.Id == new Guid(categoryId) && c.Description == description && c.IsActive))
                return false;
            else
                return Context.TreeCategories.Any(c => c.Description == description && c.IsActive);
        }

        public bool RemoveWithChildren(Guid id)
        {
            var entity = Context.TreeCategories.Find(id);

            if (entity == null)
                return false;
            entity.IsActive = false;
            var children = Context.Trees.Where(c => c.IsActive && c.IdTreeCategory == id).ToList();
            foreach (var tree in children)
            {
                tree.IsActive = false;
            }
            Context.SaveChanges();

            return true;
        }

        public string GetDescription(Guid categoryId)
        {
            var category = Context.TreeCategories
                .FirstOrDefault(c => c.Id == categoryId);

            return category.Description;
        }
    }
}
