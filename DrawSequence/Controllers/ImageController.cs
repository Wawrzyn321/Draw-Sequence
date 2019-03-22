using DrawSequence.Application.ImageProcessing;
using DrawSequence.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using DrawSequence.Commands.Image.Contract;

namespace DrawSequence.Controllers
{
    public class ImageController : Controller
    {
        private readonly Lazy<IUploadImageCommand> uploadImageCommand;
        private readonly Lazy<IGetImagesCommand> getImagesCommand;
        private readonly Lazy<IGetImagesCountCommand> getImagesCountCommand;
        private readonly Lazy<IDeleteImagesCommand> deleteImagesCommand;

        public ImageController(Lazy<IGetImagesCountCommand> getImagesCountCommand, Lazy<IDeleteImagesCommand> deleteImagesCommand, Lazy<IGetImagesCommand> getImagesCommand, Lazy<IUploadImageCommand> uploadImageCommand)
        {
            this.getImagesCountCommand = getImagesCountCommand;
            this.deleteImagesCommand = deleteImagesCommand;
            this.getImagesCommand = getImagesCommand;
            this.uploadImageCommand = uploadImageCommand;
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage(UploadImageViewModel model,
            [FromQuery] DigitDetectionOptions options) =>
            await uploadImageCommand.Value.ExecuteAsync(model, options, ModelState);

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int start, [FromQuery] int end) =>
            await getImagesCommand.Value.ExecuteAsync(start, end);

        [HttpGet]
        public async Task<IActionResult> GetCount() => 
            await getImagesCountCommand.Value.ExecuteAsync();

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> DeleteImages([FromQuery] int startIndex) =>
            await deleteImagesCommand.Value.ExecuteAsync(startIndex);
    }
}
