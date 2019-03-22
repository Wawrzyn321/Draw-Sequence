using System.Collections.Generic;
using DrawSequence.ViewModels;

namespace DrawSequence.Application
{
    public class ResponseImageViewModelSimpleFactory
    {
        public static ResponseImageViewModel GenerateSuccessResponse(string recognizedText, int expectedNumber)
        {
            return new ResponseImageViewModel
            {
                ExpectedNumber = expectedNumber,
                Succeeded = true,
                RecognizedText = recognizedText,
                Errors = new List<string>()
            };
        }

        public static ResponseImageViewModel GenerateFailureResponse(string recognizedText, int expectedNumber, List<string> errors)
        {
            return new ResponseImageViewModel
            {
                ExpectedNumber = expectedNumber,
                Succeeded = false,
                RecognizedText = recognizedText,
                Errors = errors
            };
        }

        public static ResponseImageViewModel GenerateFailureResponse(string recognizedText, int expectedNumber, params string[] errors)
        {
            return new ResponseImageViewModel
            {
                ExpectedNumber = expectedNumber,
                Succeeded = false,
                RecognizedText = recognizedText,
                Errors = new List<string>(errors)
            };
        }
    }
}