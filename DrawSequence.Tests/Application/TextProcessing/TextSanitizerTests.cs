using System;
using DrawSequence.Application.TextProcessing;
using Xunit;
using Xunit.Sdk;

namespace DrawSequence.Tests.Application.TextProcessing
{
    public class TextSanitizerTests
    {
        [Fact]
        public void On_NullInput_ThrowsArgumentException()
        {
            var sanitizer = new TextSanitizer();

            void Act()
            {
                sanitizer.Process(null);
            }

            Assert.Throws<ArgumentException>((Action) Act);
        }

        [Fact]
        public void Sanitizer_StripsWhitespace()
        {
            var sanitizer = new TextSanitizer();

            var output = sanitizer.Process(" \n \tA\n\t ");

            Assert.Equal("A", output);
        }

        [Theory]
        [InlineData(@"[.,()-_+='\*]", "")]
        public void Sanitizer_ReplacesInvalidCharacters(string input, string expected)
        {
            var sanitizer = new TextSanitizer();

            var output = sanitizer.Process(input);

            Assert.Equal(expected, output);
        }
    }
}
