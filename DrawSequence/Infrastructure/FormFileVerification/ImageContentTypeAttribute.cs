using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DrawSequence.Application;
using Microsoft.AspNetCore.Http;

namespace DrawSequence.Infrastructure.FormFileVerification
{
    public class ImageContentTypeAttribute : ValidationAttribute
    {
        private static readonly List<string> availableFileTypes = new List<string>
        {
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/bmp"
        };

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var file = (IFormFile)value;
            if (file == null)
            {
                return null;
            }

            string type = file.ContentType.ToLower();
            if (availableFileTypes.Contains(type) == false)
            {
                return new ValidationResult(ErrorMessages.INVALID_FILE_TYPE);
            }

            return ValidationResult.Success;
        }
    }
}