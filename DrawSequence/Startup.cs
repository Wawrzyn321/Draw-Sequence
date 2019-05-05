using System;
using System.Collections.Generic;
using System.Text;
using DrawSequence.Application;
using DrawSequence.Application.ImageProcessing.EngineProvider;
using DrawSequence.Application.ImageProcessing.TextExtractor;
using DrawSequence.Commands.Auth;
using DrawSequence.Commands.Auth.Contract;
using DrawSequence.Commands.Image;
using DrawSequence.Commands.Image.Contract;
using DrawSequence.Controllers;
using DrawSequence.Controllers.Contract;
using DrawSequence.Database;
using DrawSequence.Infrastructure;
using DrawSequence.Infrastructure.FormFileVerification;
using DrawSequence.Infrastructure.Utility;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace DrawSequence
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOriginsHeadersAndMethods",
                    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });
            services.AddDbContext<Context>(options =>
                options.UseSqlServer(Configuration.GetConnectionStringWithFallback()));
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<Context>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(ConfigureAuthenticationOptions)
                .AddJwtBearer(ConfigureJwtBearerOptions);

            services.AddScoped<ContinuityManager>();
            services.AddScoped<ITextExtractor, TesseractTextExtractor>();
            services.AddSingleton<ITesseractEngineProvider, TesseractEngineProvider>();
            services.AddTransient<DbContext>();
            services.AddTransient<IBitmapUtility, BitmapUtility>();
            services.AddTransient<SeedData>();
            services.AddTransient<JwtTokenGenerator>();
            services.AddTransient<IImageRatioValidator, ImageRatioValidator>();

            AddImageCommands(services);
            AddAuthCommands(services);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        private void AddImageCommands(IServiceCollection services)
        {
            services.AddScopedLazy<IUploadImageCommand, UploadImageCommand>();
            services.AddScopedLazy<IGetImagesCommand, GetImagesCommand>();
            services.AddScopedLazy<IGetImagesCountCommand, GetImagesCountCommand>();
            services.AddScopedLazy<IDeleteImagesCommand, DeleteImagesCommand>();
        }

        private void AddAuthCommands(IServiceCollection services)
        {
            services.AddScopedLazy<ILoginCommand, LoginCommand>();
            services.AddScopedLazy<IChangePasswordCommand, ChangePasswordCommand>();
        }

        private void ConfigureAuthenticationOptions(AuthenticationOptions options)
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }

        private void ConfigureJwtBearerOptions(JwtBearerOptions options)
        {
            string issuer = Configuration["Data:Auth:JwtIssuer"];
            string audience = Configuration["Data:Auth:JwtAudience"];
            string key = Configuration["Data:Auth:JwtKey"];

            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.ClaimsIssuer = issuer;

            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = issuer,

                ValidateAudience = true,
                ValidAudience = audience,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),

                RequireExpirationTime = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, SeedData seedData)
        {
            //workaround for https://github.com/aspnet/AspNetCore/issues/4398
            app.Use(async (ctx, next) =>
            {
                await next();
                if (ctx.Response.StatusCode == 204)
                {
                    ctx.Response.ContentLength = 0;
                }
            });
            app.UseCors("AllowAllOriginsHeadersAndMethods");
            if (env.IsDevelopment())
            {
                app.UseStatusCodePages();
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute("default", "{controller=Home}/{action=Index}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            seedData.EnsureAdminPresent();
        }
    }
}
