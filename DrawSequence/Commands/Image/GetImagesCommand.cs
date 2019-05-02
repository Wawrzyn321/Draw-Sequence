using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DrawSequence.Commands.Image.Contract;
using DrawSequence.Database;
using Ionic.Zip;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DrawSequence.Commands.Image
{
    public class GetImagesCommand : IGetImagesCommand
    {
        private readonly Context context;

        public GetImagesCommand(Context context)
        {
            this.context = context;
        }

        public async Task<IActionResult> ExecuteAsync(int start, int end)
        {
            start = start + 1; //"number" values start from 1
            var zipMemoryStream = new MemoryStream();
            var entries = await context.Entries
                .Where(e => e.Number >= start && e.Number <= end)
                .Select(e => new { e.Content, e.Number })
                .AsNoTracking()
                .ToArrayAsync();

            using (var zip = new ZipFile())
            {
                foreach (var entry in entries)
                {
                    var imageMemoryStream = new MemoryStream(entry.Content);
                    string entryName = "FILE_" + entry.Number;
                    zip.AddEntry(entryName, imageMemoryStream);
                }
                zip.Save(zipMemoryStream);
            }

            zipMemoryStream.Position = 0;
            return new FileStreamResult(zipMemoryStream, "application/zip");
        }
    }
}