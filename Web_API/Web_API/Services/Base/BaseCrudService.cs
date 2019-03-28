using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using Web_API.DataLayer;
using Web_API.Models.Base;

namespace Web_API.Services.Base
{
    public abstract class BaseCrudService<T> : BaseService
            where T : BaseModel, new()
    {

        protected BaseCrudService(IDatabaseContext context)
            : base(context)
        {
        }

        public virtual Guid AddOrUpdate(T entity)
        {
            var isExistRecord = Context.Set<T>().Any(c => c.Id == entity.Id);

            if (isExistRecord)
                Context.Set<T>().Update(entity);
            else
                Context.Set<T>().Add(entity);

            Context.SaveChanges();
            return entity.Id;
        }

        public virtual bool Remove(Guid id)
        {
            var entity = Context.Set<T>().Find(id);

            if (entity == null)
                return false;
            entity.IsActive = false;

            Context.SaveChanges();

            return true;
        }

        public virtual bool RemoveRange(List<Guid> ids)
        {
            ids.ForEach(id =>
            {
                var entity = new T { Id = id };
                Context.Set<T>().Attach(entity);
            });
            Context.SaveChanges();
            return true;
        }

        public virtual T Get(Guid id)
        {
            return Context.Set<T>().Find(id);
        }

        public virtual List<T> GetList()
        {
            return Context.Set<T>().ToList();
        }
    }
}
