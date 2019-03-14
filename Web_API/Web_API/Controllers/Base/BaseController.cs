using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.Models.Base;
using Web_API.Services.Base;

namespace Web_API.Controllers.Base
{
    public abstract class BaseController<TService, TModel> where TModel : BaseModel, new()
        where TService : BaseCrudService<TModel>
    {
    }
}
