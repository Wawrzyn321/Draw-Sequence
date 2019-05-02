using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DrawSequence.Commands.Image.Contract
{
    public interface IGetImagesCommand
    {
        Task<IActionResult> ExecuteAsync(int start, int end);
    }
}