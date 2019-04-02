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

        public bool IsDescriptionAlreadyUsedForCategory(string name, Guid categoryId)
        {
            return Context.Trees.Any(c => c.Name == name && c.IdTreeCategory == categoryId);
        }
    }
}
