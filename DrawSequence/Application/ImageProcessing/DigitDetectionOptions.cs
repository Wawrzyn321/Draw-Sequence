namespace DrawSequence.Application.ImageProcessing
{
    public class DigitDetectionOptions
    {
        public bool WhitelistDigits { get; set; }
        public bool RecognizeOnlyTarget { get; set; }
        public int? Target { get; set; }
        public static DigitDetectionOptions Default => new DigitDetectionOptions();
    }
}
