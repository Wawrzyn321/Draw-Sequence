using System.Drawing;

namespace DrawSequence.Infrastructure.FormFileVerification
{
    public interface IImageRatioValidator
    {
        string ErrorMessage { get; set; }
        bool Validate(Bitmap image);
    }
}