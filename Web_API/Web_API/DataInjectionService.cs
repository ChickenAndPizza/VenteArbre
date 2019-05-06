using Microsoft.Extensions.DependencyInjection;
using Web_API.Services;

namespace Web_API
{
    public static class DataInjectionService
    {
        public static IServiceCollection InjectDataServices(this IServiceCollection services)
        {
            services.AddTransient<SupplierService>();
            services.AddTransient<SupplierOrderService>();
            services.AddTransient<CustomerService>();
            services.AddTransient<CustomerOrderService>();
            services.AddTransient<CustomerOrderDetailService>();
            services.AddTransient<TreeService>();
            services.AddTransient<TreeCategoryService>();
            services.AddTransient<AuthService>();
            services.AddTransient<DistributionPointService>();
            services.AddTransient<DashboardDescriptionService>();
            return services;
        }
    }
}
