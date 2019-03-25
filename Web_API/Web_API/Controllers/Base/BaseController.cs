using Microsoft.AspNetCore.Mvc;
using Web_API.Services.Base;

namespace Web_API.Controllers.Base
{
    public abstract class BaseController<TService> : Controller where TService : BaseService
    {
        protected readonly TService Service;

        protected BaseController(TService service)
        {
            service = Service;
        }
    }
}
