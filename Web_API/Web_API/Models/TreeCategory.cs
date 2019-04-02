using System.Collections.Generic;
using Web_API.Models.Base;

namespace Web_API.Models
{
    public class TreeCategory : BaseModel
    {
        public string Description { get; set; }

        public ICollection<Tree> Trees { get; set; }
    }
}
