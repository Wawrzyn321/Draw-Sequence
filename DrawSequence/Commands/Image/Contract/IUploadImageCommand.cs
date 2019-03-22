using System.Threading.Tasks;
using DrawSequence.Application.ImageProcessing;
using DrawSequence.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DrawSequence.Commands.Image.Contract
{
    public interface IUploadImageCommand
    {
        Task<IActionResult> ExecuteAsync(UploadImageViewModel model, DigitDetectionOptions options, ModelStateDictionary modelState);
    }
}
