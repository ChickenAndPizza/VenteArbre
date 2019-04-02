using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.Models;
using Web_API.Services;

namespace Web_API
{
    public static class DataInjectionService
    {
        public static IServiceCollection InjectDataServices(this IServiceCollection services)
        {
            services.AddTransient<CustomerService>();
            services.AddTransient<TreeService>();
            services.AddTransient<TreeCategoryService>();
            services.AddTransient<AuthService>();
            return services;
        }
    }
}
