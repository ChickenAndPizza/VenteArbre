using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Models.DTO;
using Web_API.Models.Enum;
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

        public string SetAdministrator(string email)
        {
            var customer = Context.Customers.FirstOrDefault(c => c.Email == email);
            customer.IsAdmin = true;
            Context.Customers.Update(customer);
            Context.SaveChanges();
            return "Ok";
        }

        public string DeleteAdministrator(Guid id)
        {
            var customer = Context.Customers.FirstOrDefault(c => c.Id == id);
            customer.IsAdmin = false;
            Context.Customers.Update(customer);
            Context.SaveChanges();
            return "Ok";
        }

        private string Unauthorized(object p)
        {
            throw new NotImplementedException();
        }

        public List<TempCustomer> GetAdministrators()
        {
            List<Customer> customers = Context.Customers.Where(c => c.IsActive && c.IsAdmin).ToList();
            List<TempCustomer> tempCustomers = new List<TempCustomer>();

            foreach(var customer in customers)
            {
                var tempCustomer = new TempCustomer
                {
                    Id = customer.Id,
                    FirstName = customer.FirstName,
                    LastName = customer.LastName,
                    PhoneNumber = customer.PhoneNumber
                };
                tempCustomers.Add(tempCustomer);
            }
            return tempCustomers;
        }

        public string CopyCustomers(Order state)
        {
            var customersList = new List<Customer>();

            var customerOrders = Context.CustomerOrders
                .Include(c => c.Customer)
                .Where(c => c.IsActive == true && c.State == state)
                .ToList();

            foreach (var customerOrder in customerOrders)
            {
                if (!customersList.Any(c => c.Id == customerOrder.IdCustomer))
                {
                    customersList.Add(customerOrder.Customer);
                }
            }

            string emails = "";
            foreach (var customer in customersList)
            {
                emails = emails + customer.Email + ";";
            }

            return emails;
        }

    }
}
