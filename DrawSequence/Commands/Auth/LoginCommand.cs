using System.Threading.Tasks;
using DrawSequence.Application;
using DrawSequence.Commands.Auth.Contract;
using DrawSequence.Database;
using DrawSequence.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DrawSequence.Commands.Auth
{
    public class LoginCommand : ILoginCommand
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly JwtTokenGenerator tokenGenerator;

        public LoginCommand(UserManager<User> userManager, SignInManager<User> signInManager, JwtTokenGenerator tokenGenerator)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenGenerator = tokenGenerator;
        }

        public async Task<IActionResult> ExecuteAsync(LoginViewModel loginDetails, ModelStateDictionary modelState)
        {
            if (!modelState.IsValid)
            {
                return new BadRequestResult();
            }

            var user = await userManager.FindByNameAsync(loginDetails.Username);
            if (user != null)
            {
                await signInManager.SignOutAsync();

                var result = await signInManager.PasswordSignInAsync(user, loginDetails.Password, false, false);
                if (result.Succeeded)
                {
                    var token = tokenGenerator.GenerateToken(user);
                    return new OkObjectResult(token);
                }
            }
            return new BadRequestResult();
        }
    }
}
