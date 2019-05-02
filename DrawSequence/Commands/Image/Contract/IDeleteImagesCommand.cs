using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DrawSequence.Commands.Image.Contract
{
    public interface IDeleteImagesCommand
    {
        Task<IActionResult> ExecuteAsync(int startIndex);
    }
}
