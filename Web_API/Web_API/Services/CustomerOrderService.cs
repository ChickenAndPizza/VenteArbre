using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Models.DTO;
using Web_API.Models.Enum;
using Web_API.Services.Base;

namespace Web_API.Services
{
    public class CustomerOrderService : BaseCrudService<CustomerOrder>
    {
        public CustomerOrderService(IDatabaseContext context) : base(context)
        {
        }

        public CustomerOrder GetCustomerCart(Guid id)
        {
            return Context.CustomerOrders
                 .Include(c => c.OrderDetails)
                 .ThenInclude(detail => detail.Tree)
                 .Where(c => c.IdCustomer == id && c.IsActive == true && c.State == 0)
                 .Select(c => new CustomerOrder
                 {
                     Id = c.Id,
                     State = c.State,
                     IdCustomer = c.IdCustomer,
                     OrderDetails = c.OrderDetails.Where(x => x.IsActive).Select(y => new CustomerOrderDetail
                     {
                         Id = y.Id,
                         Quantity = y.Quantity,
                         IdTree = y.IdTree,
                         Tree = y.Tree,
                         IdCustomerOrder = c.Id
                     }).ToList(),
                     IsActive = c.IsActive,
                 }).ToList().FirstOrDefault();
        }

        public Guid CommandObjectInsideCart(Guid idOrder, Guid idDistributionPoint)
        {
            var cart = Context.CustomerOrders.FirstOrDefault(c => c.Id == idOrder && c.State == Order.Cart);
            cart.State = Order.Paid;
            cart.TransactionDate = DateTime.Now;
            cart.IdDistributionPoint = idDistributionPoint;
            Context.Update(cart);
            Context.SaveChanges();
            return cart.Id;
        }

        public CustomerOrder CreateCart(Guid id)
        {
            var customerCart = new CustomerOrder
            {
                IdCustomer = id,
                State = Order.Cart,
            };
            Context.CustomerOrders.Add(customerCart);
            Context.SaveChanges();
            return customerCart;
        }

        public List<CustomerOrder> GetOrdersInProgress()
        {
            var query = Context.CustomerOrders.Where(c => c.IsActive == true && c.State == Order.Paid)
                .Include(c => c.Customer)
                .Include(c => c.OrderDetails)
                .ThenInclude(c => c.Tree)
                .Select(c => new CustomerOrder
                {
                    Id = c.Id,
                    TransactionDate = c.TransactionDate,
                    Customer = c.Customer,
                    OrderDetails = c.OrderDetails.Where(x => x.IsActive).Select(y => new CustomerOrderDetail
                    {
                        Id = y.Id,
                        Quantity = y.Quantity,
                        Price = y.Price,
                        IdTree = y.IdTree,
                        Tree = y.Tree,
                        IdCustomerOrder = c.Id
                    }).ToList(),
                    Total = c.Total,
                    IsActive = c.IsActive,
                })
            .OrderBy(c => c.Customer.LastName)
            .ToList();

            return query;
        }

        public List<CustomerOrder> GetOrdersProcessed()
        {
            var query = Context.CustomerOrders.Where(c => c.IsActive == true && c.State == Order.Processed)
                .Include(c => c.Customer)
                .Include(c => c.OrderDetails)
                .ThenInclude(c => c.Tree)
                .Select(c => new CustomerOrder
                {
                    Id = c.Id,
                    TransactionDate = c.TransactionDate,
                    Customer = c.Customer,
                    OrderDetails = c.OrderDetails.Where(x => x.IsActive).Select(y => new CustomerOrderDetail
                    {
                        Id = y.Id,
                        Quantity = y.Quantity,
                        Price = y.Price,
                        IdTree = y.IdTree,
                        Tree = y.Tree,
                        IdCustomerOrder = c.Id
                    }).ToList(),
                    Total = c.Total,
                    IsActive = c.IsActive,
                })
            .OrderBy(c => c.Customer.LastName)
            .ToList();

            return query;
        }

        public List<TotalByCategory> GetTotalByCategory()
        {
            var categoriesWithTotal = Context.TreeCategories.AsNoTracking().Where(c => c.IsActive).Select(c => new TotalByCategory
            {
                CategoryName = c.Description,
                IdCategory = c.Id,
                CategoryTotal = 0
            }).ToList();


            var customerOrdersList = Context.CustomerOrders.AsNoTracking().Where(c => c.IsActive == true && c.State == Order.Paid)
                .Include(c => c.OrderDetails)
                .ThenInclude(c => c.Tree)
                .Select(c => new CustomerOrder
                {
                    OrderDetails = c.OrderDetails.Where(x => x.IsActive).Select(y => new CustomerOrderDetail
                    {
                        Quantity = y.Quantity,
                        Price = y.Price,
                        IdTree = y.IdTree,
                        Tree = y.Tree,
                    }).ToList(),
                    Total = c.Total,
                    IsActive = c.IsActive,
                }).ToList();

            List<TotalByTree> treeCount = new List<TotalByTree>();

            foreach (var customerOrder in customerOrdersList)
            {
                foreach (var detail in customerOrder.OrderDetails)
                {
                    if(!treeCount.Any(c => c.TreeName == detail.Tree.Name))
                    {
                        treeCount.Add(new TotalByTree
                        {
                            TreeName = detail.Tree.Name,
                            TreeTotal = detail.Quantity,
                            IdCategory = detail.Tree.IdTreeCategory,
                        });
                    }
                    else
                    {
                        var tree = treeCount.FirstOrDefault(c => c.TreeName == detail.Tree.Name);
                        tree.TreeTotal += detail.Quantity;
                    }
                }
            }
            var categoryToDelete = new List<Guid>();

            foreach(var category in categoriesWithTotal)
            { 
                var trees = treeCount.Where(c => c.IdCategory == category.IdCategory).ToList();
                if(trees.Count > 0)
                {
                    if (category.TreesByCategory == null)
                        category.TreesByCategory = new List<TotalByTree>();
                    foreach (var tree in trees)
                    {
                        category.TreesByCategory.Add(tree);
                        category.CategoryTotal += tree.TreeTotal;
                    }
                }
                else
                {
                    categoryToDelete.Add(category.IdCategory);
                }
            }

            foreach (var delete in categoryToDelete)
                categoriesWithTotal.RemoveAll(c => c.IdCategory == delete);

            return categoriesWithTotal;
        }
    }
}
