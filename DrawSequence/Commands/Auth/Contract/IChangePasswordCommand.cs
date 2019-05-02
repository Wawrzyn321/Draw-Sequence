using System.Threading.Tasks;
using DrawSequence.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DrawSequence.Controllers.Contract
{
    public interface IChangePasswordCommand
    {
        Task<IActionResult> ExecuteAsync(ChangePasswordViewModel viewModel, ModelStateDictionary modelState);
    }
}