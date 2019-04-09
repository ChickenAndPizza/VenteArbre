using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Models.DTO;
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

        public List<Tree> GetRandomTrees()
        {
            var trees = new List<Tree>();
            var query = Context.Trees.Where(c => c.IsActive);
            var count1 = query.Count();

            if(query.Count() <= 2)
                return query.ToList();

            do
            {

                int count = query.Count(); // 1st round-trip
                int index = new Random().Next(count);

                Tree tree = query.Skip(index).FirstOrDefault(); // 2nd round-trip

                if(!trees.Contains(tree))
                    trees.Add(tree);

            } while (trees.Count < 2);


            return trees;
        }

        public void UploadImageToDatabase(byte[] image, Guid treeId)
        {
            var tree = Context.Trees.FirstOrDefault(c => c.Id == treeId);
            if (tree != null)
            {
                tree.Image = image;
                Context.Trees.Update(tree);
                Context.SaveChanges();
            }
            
        }
    }
}
