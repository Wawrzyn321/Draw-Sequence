using System.Threading.Tasks;
using DrawSequence.Commands.Image.Contract;
using DrawSequence.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DrawSequence.Commands.Image
{
    public class GetImagesCountCommand : IGetImagesCountCommand
    {
        private readonly Context context;

        public GetImagesCountCommand(Context context)
        {
            this.context = context;
        }

        public async Task<IActionResult> ExecuteAsync()
        {
            return new JsonResult(await context.Entries.CountAsync());
        }
    }
}
