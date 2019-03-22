using System.Drawing;

namespace DrawSequence.Application.ImageProcessing.TextExtractor
{
    public interface ITextExtractor
    {
        void Initialize(DigitDetectionOptions options, int target);

        string GetText(Bitmap image);
    }
}