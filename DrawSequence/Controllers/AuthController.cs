using System;
using System.Threading.Tasks;
using DrawSequence.Commands.Auth.Contract;
using DrawSequence.Controllers.Contract;
using DrawSequence.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DrawSequence.Controllers
{
    public class AuthController : Controller
    {
        private readonly Lazy<ILoginCommand> loginCommand;
        private readonly Lazy<IChangePasswordCommand> changePasswordCommand;

        public AuthController(Lazy<ILoginCommand> loginCommand, Lazy<IChangePasswordCommand> changePasswordCommand)
        {
            this.loginCommand = loginCommand;
            this.changePasswordCommand = changePasswordCommand;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromForm] LoginViewModel loginDetails) =>
            await loginCommand.Value.ExecuteAsync(loginDetails, ModelState);

        //method available only from API
        [HttpPost]
        public async Task<IActionResult> ChangeAdminPassword([FromBody] ChangePasswordViewModel viewModel) =>
            await changePasswordCommand.Value.ExecuteAsync(viewModel, ModelState);
    }
}
