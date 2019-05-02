using System.ComponentModel.DataAnnotations;

namespace DrawSequence.ViewModels
{
    public class ChangePasswordViewModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Compare(nameof(NewPassword))]
        public string RepeatPassword{ get; set; }
    }
}