using System.Linq;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class AuthService : BaseService
    {
        public AuthService(IDatabaseContext context) : base(context)
        {
        }

        public bool Authentification(string email, string password)
        {
            return Context.Customers.Any(c => c.Email == email && c.Password == password);
        }
    }
}
