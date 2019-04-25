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
                 .Select(c => new CustomerOrder {
                     Id = c.Id,
                     State = c.State,
                     IdCustomer = c.IdCustomer,
                     OrderDetails = c.OrderDetails.Where(x => x.IsActive).Select(y => new CustomerOrderDetail {
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
            var customerCart = new CustomerOrder {
                IdCustomer = id,
                State = Order.Cart,
            };
            Context.CustomerOrders.Add(customerCart);
            Context.SaveChanges();
            return customerCart;
        }

        public int GetTotalOrdersInProgress()
        {
            var customerOrdersList = Context.CustomerOrders.AsNoTracking().Where(c => c.IsActive == true && c.State == Order.Paid)
                .Include(c => c.OrderDetails)
                .ThenInclude(c => c.Tree)
                .Select(c => new CustomerOrder {
                    Total = c.Total,
                    IsActive = c.IsActive,
                    DistributionPoint = c.DistributionPoint,
                }).ToList();

            return customerOrdersList.Count();
        }

        public int Get72hOrdersInProgress()
        {
            var customerOrdersList = Context.CustomerOrders.AsNoTracking().Where(c => c.IsActive == true && c.State == Order.Paid && c.TransactionDate >= DateTime.Now.AddDays(-3))
                .Include(c => c.OrderDetails)
                .ThenInclude(c => c.Tree)
                .Select(c => new CustomerOrder {
                    Total = c.Total,
                    IsActive = c.IsActive,
                    DistributionPoint = c.DistributionPoint,
                }).ToList();

            return customerOrdersList.Count();
        }

        public int GetTotalOrdersProcessed()
        {
            var customerOrdersList = Context.CustomerOrders.AsNoTracking().Where(c => c.IsActive == true && c.State == Order.Processed)
                .Include(c => c.OrderDetails)
                .ThenInclude(c => c.Tree)
                .Select(c => new CustomerOrder
                {
                    Total = c.Total,
                    IsActive = c.IsActive,
                    DistributionPoint = c.DistributionPoint,
                }).ToList();

            return customerOrdersList.Count();
        }

        public List<CustomerOrder> GetOrdersInProgress()
        {
            var query = Context.CustomerOrders.Where(c => c.IsActive == true && c.State == Order.Paid)
                .Include(c => c.Customer)
                .Include(c => c.OrderDetails)
                .ThenInclude(c => c.Tree)
                .Select(c => new CustomerOrder {
                    Id = c.Id,
                    TransactionDate = c.TransactionDate,
                    Customer = c.Customer,
                    OrderDetails = c.OrderDetails.Where(x => x.IsActive).Select(y => new CustomerOrderDetail {
                        Id = y.Id,
                        Quantity = y.Quantity,
                        Price = y.Price,
                        IdTree = y.IdTree,
                        Tree = y.Tree,
                        IdCustomerOrder = c.Id
                    }).ToList(),
                    Total = c.Total,
                    IsActive = c.IsActive,
                    IdSupplierOrder = c.IdSupplierOrder,
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
                .Select(c => new CustomerOrder {
                    Id = c.Id,
                    TransactionDate = c.TransactionDate,
                    Customer = c.Customer,
                    OrderDetails = c.OrderDetails.Where(x => x.IsActive).Select(y => new CustomerOrderDetail {
                        Id = y.Id,
                        Quantity = y.Quantity,
                        Price = y.Price,
                        IdTree = y.IdTree,
                        Tree = y.Tree,
                        IdCustomerOrder = c.Id
                    }).ToList(),
                    Total = c.Total,
                    IsActive = c.IsActive,
                    IdSupplierOrder = c.IdSupplierOrder,
                })
            .OrderBy(c => c.Customer.LastName)
            .ToList();

            return query;
        }

        public List<TotalByCategory> GetTotalByCategory()
        {
            var categoriesWithTotal = Context.TreeCategories.AsNoTracking().Where(c => c.IsActive).Select(c => new TotalByCategory {
                CategoryName = c.Description,
                IdCategory = c.Id,
                CategoryTotal = 0
            }).ToList();
            
            var customerOrdersList = GetCustomerOrdersWithDetails(Order.Paid);
            List<TotalByTree> treeCount = new List<TotalByTree>();
            var categoryToDelete = new List<Guid>();

            foreach (var customerOrder in customerOrdersList) {
                foreach (var detail in customerOrder.OrderDetails) {
                    if(!treeCount.Any(c => c.IdTree == detail.IdTree)) {
                        treeCount.Add(new TotalByTree {
                            IdTree = detail.IdTree,
                            TreeName = detail.Tree.Name,
                            TreeTotal = detail.Quantity,
                            IdCategory = detail.Tree.IdTreeCategory,
                        });
                    }
                    else {
                        var tree = treeCount.FirstOrDefault(c => c.IdTree == detail.IdTree);
                        tree.TreeTotal += detail.Quantity;
                    }
                }
            }
            
            foreach(var category in categoriesWithTotal){ 
                var trees = treeCount.Where(c => c.IdCategory == category.IdCategory).ToList();
                if(trees.Count > 0){
                    if (category.TreesByCategory == null)
                        category.TreesByCategory = new List<TotalByTree>();
                    foreach (var tree in trees){
                        category.TreesByCategory.Add(tree);
                        category.CategoryTotal += tree.TreeTotal;
                    }
                }
                else
                    categoryToDelete.Add(category.IdCategory);
            }

            foreach (var delete in categoryToDelete)
                categoriesWithTotal.RemoveAll(c => c.IdCategory == delete);

            return categoriesWithTotal;
        }


        public List<TotalByDistributionPoint> GetTotalByDistributionPoint()
        {
            var distributionPoints = Context.DistributionPoints.AsNoTracking().Where(c => c.IsActive).Select(c => new DistributionPoint
            {
                Id = c.Id,
                MapLink = c.MapLink,
                WebLink = c.WebLink,
                WebName = c.WebName,
                Description = c.Description
            }).ToList();
            
            var distributionPointsWithTotal = new List<TotalByDistributionPoint>();
            var customerOrdersList = GetCustomerOrdersWithDetails(Order.Paid);

            foreach (var distributionPoint in distributionPoints) {
                foreach (var customerOrder in customerOrdersList) {
                    if (customerOrder.DistributionPoint.Id == distributionPoint.Id) {
                        foreach (var detail in customerOrder.OrderDetails) {
                            if (!distributionPointsWithTotal.Any(c => c.IdDistributionPoint == distributionPoint.Id)) {
                                distributionPointsWithTotal.Add(new TotalByDistributionPoint {
                                    IdDistributionPoint = distributionPoint.Id,
                                    DistributionPointName = distributionPoint.WebName,
                                    DistributionPointTotal = detail.Quantity
                                });
                            }
                            else {
                                var distributionPointTotal = distributionPointsWithTotal.FirstOrDefault(c => c.IdDistributionPoint == distributionPoint.Id);
                                distributionPointTotal.DistributionPointTotal += detail.Quantity;
                            }
                        }
                    }
                }
            }
            return distributionPointsWithTotal;
        }

        public int GetTotalByAll()
        {
            var totalByAll = 0;
            var customerOrdersList = GetCustomerOrdersWithDetails(Order.Paid);
            foreach (var customerOrder in customerOrdersList) {
                foreach (var detail in customerOrder.OrderDetails) {
                    totalByAll += detail.Quantity;
                }
            }
            return totalByAll;
        }

        public string SetOrdersInProgressInProcess(Guid idSupplierOrder)
        {
            var customerOrdersListInProgress = GetCustomerOrdersWithDetails(Order.Paid);

            foreach (CustomerOrder customerOrder in customerOrdersListInProgress) {
                customerOrder.State = Order.InProcess;
                customerOrder.IdSupplierOrder = idSupplierOrder;
                Context.CustomerOrders.Update(customerOrder);
            }
            Context.SaveChanges();

            return "Ok";
        }

        public string SetOrdersInProcessProcessed()
        {
            var customerOrdersListInProgress = GetCustomerOrdersWithDetails(Order.InProcess);

            foreach (CustomerOrder customerOrder in customerOrdersListInProgress)
            {
                customerOrder.State = Order.Processed;
                Context.CustomerOrders.Update(customerOrder);
            }
            Context.SaveChanges();

            return "Ok";
        }

        public string SetProcessedOrdersToShipped(List<Guid> orders)
        {
            var customerOrdersListInProgress = GetCustomerOrdersWithDetails(Order.Processed);

            foreach (CustomerOrder customerOrder in customerOrdersListInProgress)
            {
                if (orders.Contains(customerOrder.Id)){
                    customerOrder.State = Order.Delivered;
                    Context.CustomerOrders.Update(customerOrder);
                }
            }
            Context.SaveChanges();

            return "Ok";
        }

        public List<CustomerOrder> GetCustomerOrdersWithDetails(Order order)
        {
            var customerOrdersList = Context.CustomerOrders
                .AsNoTracking()
                .Where(c => c.IsActive == true && c.State == order)
                .Include(c => c.OrderDetails)
                .ThenInclude(c => c.Tree)
                .Select(c => new CustomerOrder {
                    Id = c.Id,
                    TransactionDate = c.TransactionDate,
                    State = c.State,
                    IdCustomer = c.IdCustomer,
                    IdDistributionPoint = c.IdDistributionPoint,
                    Customer = c.Customer,
                    DistributionPoint = c.DistributionPoint,
                    Total = c.Total,
                    IsActive = c.IsActive,
                    IdSupplierOrder = c.IdSupplierOrder,
                    OrderDetails = c.OrderDetails
                        .Where(x => x.IsActive)
                        .Select(y => new CustomerOrderDetail {
                            Id = y.Id,
                            Quantity = y.Quantity,
                            Price = y.Price,
                            IdTree = y.IdTree,
                            IdCustomerOrder = y.IdCustomerOrder,
                            Tree = y.Tree,
                            Order = y.Order,
                        }).ToList(),
                }).ToList();

            return customerOrdersList;
        }
    }
}
