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

        public bool IsEmailAlreadyUsed(string email)
        {
            return Context.Customers.Any(c => c.Email == email);
        }
    }
}
