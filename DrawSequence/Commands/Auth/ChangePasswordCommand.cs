using System.Threading.Tasks;
using DrawSequence.Controllers.Contract;
using DrawSequence.Database;
using DrawSequence.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DrawSequence.Commands.Auth
{
    public class ChangePasswordCommand : IChangePasswordCommand
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public ChangePasswordCommand(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public async Task<IActionResult> ExecuteAsync(ChangePasswordViewModel viewModel, ModelStateDictionary modelState)
        {
            if (!modelState.IsValid)
            {
                return new BadRequestResult();
            }

            var user = await userManager.FindByNameAsync(viewModel.Username);

            if (user == null)
            {
                return new BadRequestResult();
            }

            var signInResult = await signInManager.PasswordSignInAsync(user, viewModel.OldPassword, false, false);
            if (signInResult.Succeeded)
            {
                string newPassword = userManager.PasswordHasher.HashPassword(user, viewModel.NewPassword);
                user.PasswordHash = newPassword;
                IdentityResult pdateResult = await userManager.UpdateAsync(user);
                await signInManager.SignOutAsync();
                if (pdateResult.Succeeded)
                {
                    return new OkResult();
                }
            }
            return new ForbidResult();
        }
    }
}