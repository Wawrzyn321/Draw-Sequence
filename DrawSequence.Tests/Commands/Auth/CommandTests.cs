using DrawSequence.Commands.Image;
using DrawSequence.Database;
using DrawSequence.Tests.Controllers;
using Ionic.Zip;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace DrawSequence.Tests.Commands.Auth
{
    public class CommandTests
    {
        [Fact]
        public async Task GetImagesCountCommand_ReturnsValidEntityCount()
        {
            var context = CreateDbContextStub();
            var command = new GetImagesCountCommand(context);

            var result = await command.ExecuteAsync() as JsonResult;

            Assert.NotNull(result);
            Assert.Equal(5, result.Value);
        }

        [Fact]
        public async Task RemoveImagesCommand_RemovesEntries()
        {
            var context = CreateDbContextStub();
            var command = new DeleteImagesCommand(context);

            await command.ExecuteAsync(3);

            var entries = context.Entries.ToArray();
            Assert.Equal(3, entries.Length);
            Assert.Equal(1, entries[0].Number);
            Assert.Equal(2, entries[1].Number);
            Assert.Equal(3, entries[2].Number);
        }

        private static Context CreateDbContextStub()
        {
            var entries = new List<ImageEntry>
            {
                new ImageEntry(null, 1),
                new ImageEntry(null, 2),
                new ImageEntry(null, 3),
                new ImageEntry(null, 4),
                new ImageEntry(null, 5)
            }.AsQueryable();

            var context = InMemoryDbContextFactory.GetDbContext();

            context.Entries.AddRange(entries);
            context.SaveChanges();
            return context;
        }
    }
}
