using System;
using System.IO;
using System.Reflection;
using Tesseract;

namespace DrawSequence.Application.ImageProcessing.EngineProvider
{
    public class TesseractEngineInstance : IDisposable
    {
        public TesseractEngine Engine { get; }
        public bool IsInUse { get; set; }

        public TesseractEngineInstance()
        {
            string path = GetTesseractDataPath();
            Engine = new TesseractEngine(path, "eng", EngineMode.Default);
        }

        private static string GetTesseractDataPath()
        {
            string path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().CodeBase);
            path = Path.Combine(path, "wwwroot/tessdata");
            path = path.Replace("file:\\", "");
            return path;
        }

        public void Dispose()
        {
            if (!Engine.IsDisposed)
            {
                Engine.Dispose();
            }
        }
    }
}