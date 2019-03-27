using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Models.DTO;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class CustomerService : BaseCrudService<Customer>
    {
        public CustomerService(IDatabaseContext context) : base(context)
        {
        }

        public bool IsEmailAlreadyUsed(string id, string email)
        {
            if (!string.IsNullOrWhiteSpace(id) && Context.Customers.Any(c => c.Id == new Guid(id) && c.Email == email))
                return false;
            else
                return Context.Customers.Any(c => c.Email == email);
        }

        public Customer GetCustomerByEmail(string email)
        {
            return Context.Customers.FirstOrDefault(c => c.Email == email);
        }
    }
}
