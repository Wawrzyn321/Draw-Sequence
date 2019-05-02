using Microsoft.Extensions.Configuration;

namespace DrawSequence.Infrastructure.Utility
{
    public static class IConfigurationExtensions
    {
        private const string connectionStringName = "DefaultAzureConnection";

        public static string GetConnectionStringWithFallback(this IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString(connectionStringName) 
                                      ?? configuration["Data:ConnectionString"];
            return connectionString;
        }
    }
}
