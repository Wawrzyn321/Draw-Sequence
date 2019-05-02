using System;
using DrawSequence.Database;
using Microsoft.EntityFrameworkCore;

namespace DrawSequence.Tests.Controllers
{
    public static class InMemoryDbContextFactory
    {
        public static Context GetDbContext()
        {
            var options = new DbContextOptionsBuilder<Context>()
                //.UseInMemoryDatabase("DrawSequence_UnitTesting")
                .UseInMemoryDatabase(new Guid().ToString())
                .Options;
            var dbContext = new Context(options);
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();

            //purge, as instances with the same name are shared
            //dbContext.Entries.RemoveRange(dbContext.Entries);
            //dbContext.AppUsers.RemoveRange(dbContext.AppUsers);

            return dbContext;
        }
    }
}
