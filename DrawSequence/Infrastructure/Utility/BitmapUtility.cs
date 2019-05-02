using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;

namespace DrawSequence.Infrastructure.Utility
{
    public class BitmapUtility : IBitmapUtility
    {
        public const int MAX_WIDTH = 200;
        public const int MAX_HEIGHT = 150;
        public static PixelFormat[] AllowedFormats = 
        {
            PixelFormat.Format1bppIndexed,
            PixelFormat.Format8bppIndexed,
            PixelFormat.Format32bppArgb,
            PixelFormat.Format24bppRgb
        };

        public Bitmap Resize(Bitmap bitmap)
        {
            double widthRatio = bitmap.Width / (double)MAX_WIDTH;
            double heightRatio = bitmap.Height / (double)MAX_HEIGHT;

            if (widthRatio > 1)
            {
                //take bigger of two ratios
                double ratio = Math.Max(widthRatio, heightRatio);
                var newSize = new Size(
                    (int)(bitmap.Width / ratio), 
                    (int)(bitmap.Height / ratio));
                return new Bitmap(bitmap, newSize);
            }
            else if (heightRatio > 1)
            {
                var newSize = new Size(
                    (int)(bitmap.Width / heightRatio),
                    (int)(bitmap.Height / heightRatio));
                return new Bitmap(bitmap, newSize);
            }
            else
            {
                return bitmap;
            }
        }

        public Bitmap FromFormFile(IFormFile file, bool convertToAllowedFormat = true)
        {
            if (file == null)
            {
                throw new ArgumentException("File cannot be null", nameof(file));
            }

            var stream = new MemoryStream();
            file.CopyTo(stream);
            var bitmap = new Bitmap(stream);

            if (convertToAllowedFormat && AllowedFormats.Contains(bitmap.PixelFormat) == false)
            {
                bitmap = bitmap.Clone(new Rectangle(0, 0, bitmap.Width, bitmap.Height), PixelFormat.Format32bppArgb);
            }

            return bitmap;
        }

        public byte[] ToByteArray(Bitmap image)
        {
            using (var stream = new MemoryStream())
            {
                image.Save(stream, ImageFormat.Png);
                return stream.ToArray();
            }
        }
    }
}

