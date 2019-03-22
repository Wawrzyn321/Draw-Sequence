using System.Drawing;
using Microsoft.AspNetCore.Http;

namespace DrawSequence.Infrastructure.Utility
{
    public interface IBitmapUtility
    {
        Bitmap FromFormFile(IFormFile file, bool convertToAllowedFormat = true);
        Bitmap Resize(Bitmap bitmap);
        byte[] ToByteArray(Bitmap image);
    }
}