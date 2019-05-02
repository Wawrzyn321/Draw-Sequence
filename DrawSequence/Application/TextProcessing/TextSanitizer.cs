using System;
using System.Text.RegularExpressions;

namespace DrawSequence.Application.TextProcessing
{
    public class TextSanitizer
    {
        public const string InvalidCharactersRegex = @"[\[\.,\(\)\-_\+='\\*\]]";

        public string Process(string input)
        {
            if (input == null)
            {
                throw new ArgumentException("Text to sanitize must not be null!", nameof(input));
            }

            input = Regex.Replace(input, InvalidCharactersRegex, " ");
            input = input.Trim();
            return input;
        }
    }
}
