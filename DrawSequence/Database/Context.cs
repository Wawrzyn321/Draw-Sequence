using System.IO;
using DrawSequence.Infrastructure.Utility;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace DrawSequence.Database
{
    public class Context : IdentityDbContext<User>
    {
        public DbSet<ImageEntry> Entries { get; set; }
        public DbSet<User> AppUsers { get; set; }

        public Context()
        {
        }

        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<Context>
        {
            private readonly IConfiguration configuration;

            public DesignTimeDbContextFactory()
            {
                configuration = new ConfigurationBuilder()
                    .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
                    .AddJsonFile("appsettings.json", optional: false)
                    .Build();
            }

            public DesignTimeDbContextFactory(IConfiguration configuration)
            {
                this.configuration = configuration;
            }

            public Context CreateDbContext(string[] args)
            {
                var builder = new DbContextOptionsBuilder<Context>();
                builder.UseSqlServer(configuration.GetConnectionStringWithFallback());
                return new Context(builder.Options);
            }
        }
    }

}