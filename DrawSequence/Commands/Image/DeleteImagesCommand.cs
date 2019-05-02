using System.Linq;
using System.Threading.Tasks;
using DrawSequence.Commands.Image.Contract;
using DrawSequence.Database;
using Microsoft.AspNetCore.Mvc;

namespace DrawSequence.Commands.Image
{
    public class DeleteImagesCommand : IDeleteImagesCommand
    {
        private readonly Context context;

        public DeleteImagesCommand(Context context)
        {
            this.context = context;
        }

        public async Task<IActionResult> ExecuteAsync(int startIndex)
        {
            var entriesToDelete = context.Entries.AsEnumerable().Where((entry, i) => i >= startIndex).ToList();
            if (entriesToDelete.Any())
            {
                context.Entries.RemoveRange(entriesToDelete);
                await context.SaveChangesAsync();
            }

            return new OkObjectResult(entriesToDelete.Count);
        }
    }
}
