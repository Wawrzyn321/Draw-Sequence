using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DrawSequence.Commands.Image.Contract
{
    public interface IGetImagesCountCommand
    {
        Task<IActionResult> ExecuteAsync();
    }
}
