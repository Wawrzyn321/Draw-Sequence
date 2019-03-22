using System;
using DrawSequence.Application.ImageProcessing.EngineProvider;
using Xunit;

namespace DrawSequence.Tests.Application.EngineProvider
{

    public class TesseractEngineProviderTests
    {
        [Fact]
        public void Rent_ThrowsInvalidOperationException_WhenCapacityIsExceeded()
        {
            var provider = new TesseractEngineProvider(0);

            void Act()
            {
                provider.Rent();
            }

            Assert.Throws<InvalidOperationException>((Action)Act);
        }
    }
}
