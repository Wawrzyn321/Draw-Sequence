using System;
using System.Threading.Tasks;
using DrawSequence.Commands.Auth.Contract;
using DrawSequence.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DrawSequence.Controllers
{
    public class AuthController : Controller
    {
        private readonly Lazy<ILoginCommand> loginCommand;

        public AuthController(Lazy<ILoginCommand> loginCommand)
        {
            this.loginCommand = loginCommand;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromForm] LoginViewModel loginDetails) =>
            await loginCommand.Value.ExecuteAsync(loginDetails, ModelState);

    }
}
