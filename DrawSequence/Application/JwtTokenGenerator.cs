using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DrawSequence.Database;
using DrawSequence.ViewModels;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DrawSequence.Application
{
    public class JwtTokenGenerator
    {
        private readonly IConfiguration configuration;

        public JwtTokenGenerator(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public TokenViewModel GenerateToken(User user)
        {
            string issuer = configuration["Data:Auth:JwtIssuer"];
            string audience = configuration["Data:Auth:JwtAudience"];
            string jwtKey = configuration["Data:Auth:JwtKey"];
            string expireTimeInDays = configuration["Data:Auth:JwtExpireDays"];

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti,
                    Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key,
                SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(double.Parse(expireTimeInDays));

            var token = new JwtSecurityToken(
                issuer,
                audience,
                claims,
                expires: expires,
                signingCredentials: creds
            );
            
            return new TokenViewModel
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                AccessTokenExpiration = expires,
                Username = user.UserName
            };
        }
    }
}