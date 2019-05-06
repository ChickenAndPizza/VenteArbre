using System;
using Web_API.Models.Base;

namespace Web_API.Models
{
    public class DashboardDescription : BaseModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
