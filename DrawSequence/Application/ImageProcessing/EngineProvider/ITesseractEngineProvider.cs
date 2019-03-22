namespace DrawSequence.Application.ImageProcessing.EngineProvider
{
    public interface ITesseractEngineProvider
    {
        TesseractEngineInstance Rent();

        void Release(TesseractEngineInstance engine);
    }
}