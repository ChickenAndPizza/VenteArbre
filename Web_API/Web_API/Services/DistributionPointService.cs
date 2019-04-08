using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class DistributionPointService : BaseCrudService<DistributionPoint>
    {
        public DistributionPointService(IDatabaseContext context) : base(context)
        {
        }

        public bool IsWebNameAlreadyUsed(string id, string webName)
        {
            if (!string.IsNullOrWhiteSpace(id) && Context.DistributionPoints.Any(c => c.Id == new Guid(id) && c.WebName == webName))
                return false;
            else
                return Context.DistributionPoints.Any(c => c.WebName == webName);
        }
    }
}
