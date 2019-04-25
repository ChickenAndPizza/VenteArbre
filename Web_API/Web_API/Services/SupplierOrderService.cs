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
    public class SupplierOrderService : BaseCrudService<SupplierOrder>
    {
        public SupplierOrderService(IDatabaseContext context) : base(context)
        {
        }

        public Guid CreateSupplierOrder(Guid idCustomer, Guid idSupplier)
        {
            var newSupplierOrder = new SupplierOrder
            {
                TransactionDate = DateTime.Now,
                IdCustomer = idCustomer,
                IdSupplier = idSupplier
            };
            Context.SupplierOrders.Add(newSupplierOrder);
            Context.SaveChanges();

            return newSupplierOrder.Id;
        }

        public List<SupplierOrder> GetPreviousSupplierOrders()
        {
            var query = Context.SupplierOrders.Where(c => c.IsActive)
                 .Include(c => c.OrderDetails)
                 .Select(c => new SupplierOrder
                 {
                     Id = c.Id,
                     TransactionDate = c.TransactionDate,
                     IdCustomer = c.IdCustomer,
                     IdSupplier = c.IdSupplier,
                     Customer = c.Customer,
                     Supplier = c.Supplier,
                     OrderDetails = c.OrderDetails.Where(x => x.IsActive).Select(y => new SupplierOrderDetail
                     {
                         Id = y.Id,
                         Quantity = y.Quantity,
                         IdSupplierOrder = y.IdSupplierOrder,
                         IdTree = y.IdTree,
                         Order = y.Order,
                         Tree = y.Tree,
                     }).ToList(),
                 })
             .OrderBy(c => c.Customer.LastName)
             .ToList();

            return query;
        }

        public List<TotalByCategory> GetTotalByCategory(Guid idSupplierOrder)
        {
            var categoriesWithTotal = Context.TreeCategories.AsNoTracking().Where(c => c.IsActive).Select(c => new TotalByCategory
            {
                CategoryName = c.Description,
                IdCategory = c.Id,
                CategoryTotal = 0
            }).ToList();

            var customerOrdersList = GetCustomerOrdersWithDetails(Order.Processed, idSupplierOrder);
            List<TotalByTree> treeCount = new List<TotalByTree>();
            var categoryToDelete = new List<Guid>();

            foreach (var customerOrder in customerOrdersList)
            {
                foreach (var detail in customerOrder.OrderDetails)
                {
                    if (!treeCount.Any(c => c.IdTree == detail.IdTree))
                    {
                        treeCount.Add(new TotalByTree
                        {
                            IdTree = detail.IdTree,
                            TreeName = detail.Tree.Name,
                            TreeTotal = detail.Quantity,
                            IdCategory = detail.Tree.IdTreeCategory,
                        });
                    }
                    else
                    {
                        var tree = treeCount.FirstOrDefault(c => c.IdTree == detail.IdTree);
                        tree.TreeTotal += detail.Quantity;
                    }
                }
            }

            foreach (var category in categoriesWithTotal)
            {
                var trees = treeCount.Where(c => c.IdCategory == category.IdCategory).ToList();
                if (trees.Count > 0)
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
                    categoryToDelete.Add(category.IdCategory);
            }

            foreach (var delete in categoryToDelete)
                categoriesWithTotal.RemoveAll(c => c.IdCategory == delete);

            return categoriesWithTotal;
        }


        public List<TotalByDistributionPoint> GetTotalByDistributionPoint(Guid idSupplierOrder)
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
            var customerOrdersList = GetCustomerOrdersWithDetails(Order.Processed, idSupplierOrder);

            foreach (var distributionPoint in distributionPoints)
            {
                foreach (var customerOrder in customerOrdersList)
                {
                    if (customerOrder.DistributionPoint.Id == distributionPoint.Id)
                    {
                        foreach (var detail in customerOrder.OrderDetails)
                        {
                            if (!distributionPointsWithTotal.Any(c => c.IdDistributionPoint == distributionPoint.Id))
                            {
                                distributionPointsWithTotal.Add(new TotalByDistributionPoint
                                {
                                    IdDistributionPoint = distributionPoint.Id,
                                    DistributionPointName = distributionPoint.WebName,
                                    DistributionPointTotal = detail.Quantity
                                });
                            }
                            else
                            {
                                var distributionPointTotal = distributionPointsWithTotal.FirstOrDefault(c => c.IdDistributionPoint == distributionPoint.Id);
                                distributionPointTotal.DistributionPointTotal += detail.Quantity;
                            }
                        }
                    }
                }
            }
            return distributionPointsWithTotal;
        }

        public int GetTotalByAll(Guid idSupplierOrder)
        {
            var totalByAll = 0;
            var customerOrdersList = GetCustomerOrdersWithDetails(Order.Processed, idSupplierOrder);
            foreach (var customerOrder in customerOrdersList)
            {
                foreach (var detail in customerOrder.OrderDetails)
                {
                    totalByAll += detail.Quantity;
                }
            }
            return totalByAll;
        }

        public List<CustomerOrder> GetCustomerOrdersWithDetails(Order order, Guid idSupplierOrder)
        {
            var customerOrdersList = Context.CustomerOrders
                .AsNoTracking()
                .Where(c => c.IsActive == true && (int)c.State >= (int)order && c.IdSupplierOrder == idSupplierOrder)
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

            return customerOrdersList;
        }

    }
}
