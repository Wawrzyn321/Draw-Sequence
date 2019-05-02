using System.ComponentModel.DataAnnotations;
using DrawSequence.Infrastructure.FormFileVerification;
using Microsoft.AspNetCore.Http;

namespace DrawSequence.ViewModels
{
    public class UploadImageViewModel
    {
        [Required]
        [MaxFileSize(2 * 1024 * 1024)]
        [ImageContentType]
        public IFormFile File { get; set; }
    }
}

    