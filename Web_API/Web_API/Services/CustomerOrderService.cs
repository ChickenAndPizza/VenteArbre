using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Web_API.DataLayer;
using Web_API.Models;
using Web_API.Models.DTO;
using Web_API.Models.Enum;
using Web_API.Models.Supplier;
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
            var cart = Context.CustomerOrders
                .Include(c => c.OrderDetails)
                .FirstOrDefault(c => c.Id == idOrder && c.State == Order.Cart);
            cart.State = Order.Paid;
            cart.TransactionDate = DateTime.Now;
            cart.IdDistributionPoint = idDistributionPoint;
            
            List<CustomerOrderDetail> customerOrderDetails = cart.OrderDetails.ToList();
            decimal cartTotal = 0;
            for (var index = 0; index < customerOrderDetails.Count; index++)
            {
                var customerOrderDetail = customerOrderDetails[index];
                var treePrice = Context.Trees.FirstOrDefault(c => c.Id == customerOrderDetail.IdTree).Price;
                customerOrderDetails[index].Price = treePrice;
                cartTotal += ( treePrice * customerOrderDetail.Quantity);
            }
            cart.OrderDetails = customerOrderDetails;
            cart.Total = cartTotal;

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

        public List<DistributionPointWithOrders> GetOrders(Order state)
        {
            var distributionPoints = GetDistributionPoints();

            var distributionPointsWithOrders = new List<DistributionPointWithOrders>();
            foreach (var distributionPoint in distributionPoints)
            {
                var distributionPointWithOrder = new DistributionPointWithOrders
                {
                    IdDistributionPoint = distributionPoint.Id,
                    DistributionPointName = distributionPoint.WebName,
                    CustomerOrders = new List<CustomerOrder>()
                };
                distributionPointsWithOrders.Add(distributionPointWithOrder);
            }

            var customerOrders = GetCustomerOrdersWithDetails(state);

            foreach (var distributionPointWithOrder in distributionPointsWithOrders)
            {
                foreach (var customerOrder in customerOrders)
                {
                    if (customerOrder.DistributionPoint.Id == distributionPointWithOrder.IdDistributionPoint)
                    {
                        distributionPointWithOrder.CustomerOrders.Add(customerOrder);
                    }
                }
            }

            var pointsToDelete = new List<Guid>();
            for (int index = 0; index < distributionPointsWithOrders.Count; index++)
            {
                if (distributionPointsWithOrders[index].CustomerOrders.Count == 0)
                    pointsToDelete.Add(distributionPointsWithOrders[index].IdDistributionPoint);
            }

            foreach (var delete in pointsToDelete)
                distributionPointsWithOrders.RemoveAll(c => c.IdDistributionPoint == delete);

            return distributionPointsWithOrders;
        }

        public List<TotalByCategory> GetTotalByCategory(Order state)
        {
            var categoriesWithTotal = Context.TreeCategories.AsNoTracking().Where(c => c.IsActive).Select(c => new TotalByCategory {
                CategoryName = c.Description,
                IdCategory = c.Id,
                CategoryTotal = 0
            }).ToList();
            
            var customerOrdersList = GetCustomerOrdersWithDetails(state);
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


        public List<TotalByDistributionPoint> GetTotalByDistributionPoint(Order state)
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
            var customerOrdersList = GetCustomerOrdersWithDetails(state);

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

        public int GetTotalByAll(Order state)
        {
            var totalByAll = 0;
            var customerOrdersList = GetCustomerOrdersWithDetails(state);
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
            List<SupplierOrderDetail> supplierOrderDetails = new List<SupplierOrderDetail>();

            foreach (CustomerOrder customerOrder in customerOrdersListInProgress) {
                customerOrder.State = Order.InProcess;
                customerOrder.IdSupplierOrder = idSupplierOrder;
                Context.CustomerOrders.Update(customerOrder);
                
                foreach (var customerOrderDetail in customerOrder.OrderDetails) {

                    if (supplierOrderDetails.FirstOrDefault(c => c.IdTree == customerOrderDetail.IdTree) != null) {
                        supplierOrderDetails.FirstOrDefault(c => c.IdTree == customerOrderDetail.IdTree)
                            .Quantity += customerOrderDetail.Quantity;
                    }
                    else {
                        var supplierOrderDetail = new SupplierOrderDetail
                        {
                            Quantity = customerOrderDetail.Quantity,
                            IdSupplierOrder = idSupplierOrder,
                            IdTree = customerOrderDetail.IdTree
                        };
                        supplierOrderDetails.Add(supplierOrderDetail);
                    }
                }
            }
            var supplierOrder = Context.SupplierOrders.FirstOrDefault(c => c.Id == idSupplierOrder);
            supplierOrder.OrderDetails = supplierOrderDetails;
            Context.SupplierOrders.Update(supplierOrder);

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

        public int GetTotalOrdersForCustomer(Guid customerId)
        {
            return Context.CustomerOrders.AsNoTracking().Count(c => c.IsActive == true && (int)c.State >= (int)Order.Paid && c.IdCustomer == customerId);
        }

        public string CancelProcessOfOrders()
        {
            var customerOrdersListInProgress = GetCustomerOrdersWithDetails(Order.InProcess);

            foreach (CustomerOrder customerOrder in customerOrdersListInProgress)
            {
                customerOrder.State = Order.Paid;
                Context.CustomerOrders.Update(customerOrder);
            }
            Context.SaveChanges();
            return "Ok";
        }

        public List<CustomerOrder> GetPreviousCustomerOrders(Guid customerId)
        {
            var query = Context.CustomerOrders
                 .AsNoTracking()
                 .Where(c => c.IsActive == true && c.IdCustomer == customerId && (int)c.State >= (int)Order.Paid)
                 .Include(c => c.OrderDetails)
                 .ThenInclude(c => c.Tree)
                 .Select(c => new CustomerOrder
                 {
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
                        .Select(y => new CustomerOrderDetail
                        {
                            Id = y.Id,
                            Quantity = y.Quantity,
                            Price = y.Price,
                            IdTree = y.IdTree,
                            IdCustomerOrder = y.IdCustomerOrder,
                            Tree = y.Tree,
                            Order = y.Order,
                        }).ToList(),
                 })
                 .OrderByDescending(c => c.TransactionDate)
                 .ToList();

            return query;
        }

        public CustomerOrder GetCustomerOrder(Guid customerOrderId)
        {
            var query = Context.CustomerOrders
                 .Include(c => c.OrderDetails)
                 .ThenInclude(c => c.Tree)
                 .Select(c => new CustomerOrder
                 {
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
                        .Select(y => new CustomerOrderDetail
                        {
                            Id = y.Id,
                            Quantity = y.Quantity,
                            Price = y.Price,
                            IdTree = y.IdTree,
                            IdCustomerOrder = y.IdCustomerOrder,
                            Tree = y.Tree,
                            Order = y.Order,
                        }).ToList(),
                 })
                 .FirstOrDefault(c => c.IsActive == true && c.Id == customerOrderId);

            return query;
        }

        public int GetTotalOrdersOfSupplierOrder(Guid supplierOrderId)
        {
            var customerOrdersList = Context.CustomerOrders.AsNoTracking().Where(c => c.IsActive == true && c.IdSupplierOrder == supplierOrderId)
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

        public int GetTotalOrdersNotShippedOfSupplierOrder(Guid supplierOrderId)
        {
            var customerOrdersList = Context.CustomerOrders.AsNoTracking().Where(c => c.IsActive == true && c.IdSupplierOrder == supplierOrderId && (int)c.State < (int)Order.Delivered)
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

        public List<DistributionPointWithOrders> GetOrdersOfSupplierOrder(Guid supplierOrderId)
        {
            var distributionPoints = GetDistributionPoints();

            var distributionPointsWithOrders = new List<DistributionPointWithOrders>();
            foreach (var distributionPoint in distributionPoints)
            {
                var distributionPointWithOrder = new DistributionPointWithOrders
                {
                    IdDistributionPoint = distributionPoint.Id,
                    DistributionPointName = distributionPoint.WebName,
                    CustomerOrders = new List<CustomerOrder>()
                };
                distributionPointsWithOrders.Add(distributionPointWithOrder);
            }

            var customerOrders = Context.CustomerOrders
                .AsNoTracking()
                .Where(c => c.IsActive == true && c.IdSupplierOrder == supplierOrderId)
                .Include(c => c.OrderDetails)
                .ThenInclude(c => c.Tree)
                .Select(c => new CustomerOrder
                {
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
                        .Select(y => new CustomerOrderDetail
                        {
                            Id = y.Id,
                            Quantity = y.Quantity,
                            Price = y.Price,
                            IdTree = y.IdTree,
                            IdCustomerOrder = y.IdCustomerOrder,
                            Tree = y.Tree,
                            Order = y.Order,
                        }).ToList(),
                }).ToList();

            foreach (var distributionPointWithOrder in distributionPointsWithOrders)
            {
                foreach (var customerOrder in customerOrders)
                {
                    if (customerOrder.DistributionPoint.Id == distributionPointWithOrder.IdDistributionPoint)
                    {
                        distributionPointWithOrder.CustomerOrders.Add(customerOrder);
                    }
                }
            }

            var pointsToDelete = new List<Guid>();
            for (int index = 0; index < distributionPointsWithOrders.Count; index++)
            {
                if (distributionPointsWithOrders[index].CustomerOrders.Count == 0)
                    pointsToDelete.Add(distributionPointsWithOrders[index].IdDistributionPoint);
            }

            foreach (var delete in pointsToDelete)
                distributionPointsWithOrders.RemoveAll(c => c.IdDistributionPoint == delete);

            return distributionPointsWithOrders;
        }

        public List<DistributionPoint> GetDistributionPoints()
        {
            return Context.DistributionPoints.AsNoTracking().Where(c => c.IsActive).Select(c => new DistributionPoint
            {
                Id = c.Id,
                MapLink = c.MapLink,
                WebLink = c.WebLink,
                WebName = c.WebName,
                Description = c.Description
            })
            .OrderBy(c => c.WebName)
            .ToList();
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
