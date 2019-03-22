using System;
using Microsoft.Extensions.DependencyInjection;

namespace DrawSequence.Infrastructure.Utility
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddScopedLazy<TService, TImplementation>(this IServiceCollection services) where TService : class where TImplementation : class, TService
        {
            services
                .AddScoped<TService, TImplementation>()
                .AddScoped(x => new Lazy<TService>(x.GetRequiredService<TService>));
            return services;
        }
    }
}
