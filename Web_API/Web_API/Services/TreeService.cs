using System;
using System.Linq;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class TreeService : BaseCrudService<Tree>
    {
        public TreeService(IDatabaseContext context) : base(context)
        {
        }

        public bool IsDescriptionAlreadyUsedForCategory(string name, Guid categoryId, string treeId)
        {
            if (!string.IsNullOrWhiteSpace(treeId) && Context.Trees.Any(c => c.Id == new Guid(treeId) && c.Name == name && c.IdTreeCategory == categoryId))
                return false;
            else
                return Context.Trees.Any(c => c.Name == name && c.IdTreeCategory == categoryId);
        }
    }
}
