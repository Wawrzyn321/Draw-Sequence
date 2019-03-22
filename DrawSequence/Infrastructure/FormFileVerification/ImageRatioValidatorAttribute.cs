using System.Drawing;
using DrawSequence.Application;

namespace DrawSequence.Infrastructure.FormFileVerification
{
    public class ImageRatioValidator : IImageRatioValidator
    {
        public const double MinRatio = 4 / 3.0;
        public const double MaxRatio = 16 / 9.0;
        public const string MinRatioText = "4/3";
        public const string MaxRatioText = "16/9";

        public string ErrorMessage { get; set; }

        public bool Validate(Bitmap image)
        {
            double ratio = image.Width / (double)image.Height;
            if (ratio > MaxRatio || ratio < MinRatio)
            {
                ErrorMessage = string.Format(ErrorMessages.INVALID_RATIO, ratio.ToString("0.00"), MinRatioText,
                    MaxRatioText);
                return false;
            }
            else
            {
                ErrorMessage = null;
                return true;
            }
        }
    }
}