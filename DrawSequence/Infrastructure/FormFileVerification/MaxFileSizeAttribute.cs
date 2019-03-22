using System.ComponentModel.DataAnnotations;
using DrawSequence.Application;
using Microsoft.AspNetCore.Http;

namespace DrawSequence.Infrastructure.FormFileVerification
{
    public class MaxFileSizeAttribute : ValidationAttribute
    {
        private readonly long maxSizeInBytes;

        public MaxFileSizeAttribute(long maxSizeInBytes)
        {
            this.maxSizeInBytes = maxSizeInBytes;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var file = (IFormFile) value;
            if (file == null)
            {
                return null;
            }

            if (file.Length > maxSizeInBytes)
            {
                return new ValidationResult(ErrorMessages.FILE_SIZE_EXCEEDED);
            }

            return ValidationResult.Success;
        }
    }
}
