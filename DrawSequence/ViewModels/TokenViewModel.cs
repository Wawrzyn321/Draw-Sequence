using System;

namespace DrawSequence.ViewModels
{
    public class TokenViewModel
    {
        public string AccessToken { get; set; }
        public DateTime AccessTokenExpiration { get; set; }
        public string Username { get; set; }
    }
}
