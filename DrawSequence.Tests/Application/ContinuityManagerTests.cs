using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DrawSequence.Application;
using DrawSequence.Database;
using DrawSequence.Tests.Controllers;
using Xunit;

namespace DrawSequence.Tests.Application
{
    public class ContinuityManagerTests
    {
        [Fact]
        public async Task TryIncrementCurrentNumber_Fails_OnAddingDuplicateEntry()
        {
            var context = CreateDbContextMock();
            var manager = new ContinuityManager(context);

            var duplicateEntry = new ImageEntry(null, 1);

            bool result = await manager.TryIncrementCurrentNumber(duplicateEntry);

            Assert.False(result);
            Assert.Equal(2, manager.GetCurrentNumber()); //assert number hasn't changed
        }

        [Fact]
        public async Task TryIncrementCurrentNumber_IncrementsCounter_OnValidEntry()
        {
            var context = CreateDbContextMock();
            var manager = new ContinuityManager(context);
            var nextEntry = new ImageEntry(null, 2);

            bool result = await manager.TryIncrementCurrentNumber(nextEntry);

            Assert.True(result);
            Assert.Equal(3, manager.GetCurrentNumber()); //2 entries + 1
        }

        private static Context CreateDbContextMock()
        {
            var entries = new List<ImageEntry>
            {
                new ImageEntry(null, 1)
            }.AsQueryable();

            var context = InMemoryDbContextFactory.GetDbContext();
            
            context.Entries.AddRange(entries);
            context.SaveChanges();
            return context;
        }
    }
}
