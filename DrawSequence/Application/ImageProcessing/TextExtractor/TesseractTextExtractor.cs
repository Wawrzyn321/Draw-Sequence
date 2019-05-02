using System;
using System.Drawing;
using System.Linq;
using DrawSequence.Application.ImageProcessing.EngineProvider;
using Tesseract;

namespace DrawSequence.Application.ImageProcessing.TextExtractor
{
    public class TesseractTextExtractor : ITextExtractor
    {
        private const string TESSERACT_WHITELIST = "tessedit_char_whitelist";

        private DigitDetectionOptions options = DigitDetectionOptions.Default;
        private readonly ITesseractEngineProvider provider;

        public TesseractTextExtractor(ITesseractEngineProvider provider)
        {
            this.provider = provider;
        }

        public void Initialize(DigitDetectionOptions options, int target)
        {
            if (options.RecognizeOnlyTarget)
            {
                options.Target = target;
            }

            this.options = options;
        }

        public string GetText(Bitmap image)
        {
            TesseractEngineInstance engineInstance = null;
            try
            {
                engineInstance = provider.Rent();
            }
            catch (InvalidOperationException)
            {
                if (engineInstance != null)
                {
                    provider.Release(engineInstance);
                }
                throw;
            }
            SetupEngine(engineInstance.Engine);

            using (var img = new BitmapToPixConverter().Convert(image))
            {
                using (var page = engineInstance.Engine.Process(img, PageSegMode.SingleWord))
                {
                    provider.Release(engineInstance);
                    return page.GetText();
                }
            }
        }

        private void SetupEngine(TesseractEngine engine)
        {
            if (options.RecognizeOnlyTarget)
            {
                if (!options.Target.HasValue)
                {
                    throw new ArgumentNullException(nameof(options.Target));
                }

                engine.SetVariable(TESSERACT_WHITELIST, 
                    string.Join("", options.Target.Value.ToString().Distinct()));
            }
            else if (options.WhitelistDigits)
            {
                engine.SetVariable(TESSERACT_WHITELIST, "0123456789");
            }
            else
            {
                //bring back default
                engine.SetVariable(TESSERACT_WHITELIST, "");
            }
        }
    }
}
