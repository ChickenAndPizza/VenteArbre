using Web_API.DataLayer;

namespace Web_API.Services.Base
{
    public abstract class BaseService
    {
        protected readonly IDatabaseContext Context;
        protected BaseService(IDatabaseContext context)
        {
            Context = context;
        }
    }
}
