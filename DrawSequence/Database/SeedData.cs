using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DrawSequence.Database
{
    public class SeedData
    {
        private readonly Context context;
        private readonly SignInManager<User> signInManager;

        public SeedData(Context context, SignInManager<User> signInManager)
        {
            this.context = context;
            this.signInManager = signInManager;
        }

        public void EnsureAdminPresent()
        {
            context.Database.Migrate();

            //create an admin. Of course, user and password on demo page are different :)
            if (signInManager.UserManager.FindByNameAsync("admin").Result == null)
            {
                context.AppUsers.RemoveRange(context.AppUsers);
                context.SaveChanges();
                var user = new User
                {
                    UserName = "admin"
                };
                var result = signInManager.UserManager.CreateAsync(user, "Zaq12wsx!").Result;
                if (!result.Succeeded)
                {
                    throw new System.Exception("Cannot create administrator user!: " + result.Errors.First());
                }
            }
            context.SaveChanges();
        }
    }
}
