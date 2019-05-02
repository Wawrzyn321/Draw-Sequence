using DrawSequence.Application;
using DrawSequence.Application.ImageProcessing;
using DrawSequence.Application.ImageProcessing.TextExtractor;
using DrawSequence.Application.TextProcessing;
using DrawSequence.Commands.Image.Contract;
using DrawSequence.Database;
using DrawSequence.Infrastructure.FormFileVerification;
using DrawSequence.Infrastructure.Utility;
using DrawSequence.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace DrawSequence.Commands.Image
{
    public class UploadImageCommand : IUploadImageCommand
    {
        private readonly ContinuityManager continuityManager;
        private readonly ITextExtractor textExtractor;
        private readonly IBitmapUtility bitmapUtility;
        private readonly IImageRatioValidator imageRatioValidator;

        public UploadImageCommand(ContinuityManager continuityManager, ITextExtractor textExtractor, IBitmapUtility bitmapUtility, IImageRatioValidator imageRatioValidator)
        {
            this.continuityManager = continuityManager;
            this.textExtractor = textExtractor;
            this.bitmapUtility = bitmapUtility;
            this.imageRatioValidator = imageRatioValidator;
        }

        public async Task<IActionResult> ExecuteAsync(UploadImageViewModel model, DigitDetectionOptions options, ModelStateDictionary modelState)
        {
            var viewModel = await ProcessImage(model, options, modelState);
            return new JsonResult(viewModel);
        }

        private async Task<ResponseImageViewModel> ProcessImage(UploadImageViewModel model, DigitDetectionOptions options, ModelStateDictionary modelState)
        {
            int expectedNumber = continuityManager.GetCurrentNumber();

            if (!modelState.IsValid)
            {
                var errors = modelState.SelectMany(pair => pair.Value.Errors.Select(error => error.ErrorMessage))
                    .ToList();
                return ResponseImageViewModelSimpleFactory.GenerateFailureResponse(null, expectedNumber, errors);
            }

            //preprocess image
            var bitmap = bitmapUtility.FromFormFile(model.File);

            if (!imageRatioValidator.Validate(bitmap))
            {
                return ResponseImageViewModelSimpleFactory.GenerateFailureResponse(null, expectedNumber,
                    imageRatioValidator.ErrorMessage);
            }

            //extract text
            string recognizedText = await TryRecognizeText(options, bitmap);

            if (recognizedText == null)
            {
                return ResponseImageViewModelSimpleFactory.GenerateFailureResponse(null, expectedNumber,
                    ErrorMessages.SERVER_OVERLOADED);
            }

            //preprocess text
            var sanitizer = new TextSanitizer();
            recognizedText = sanitizer.Process(recognizedText);

            var expectedText = continuityManager.GetCurrentNumber().ToString();

            if (expectedText == recognizedText)
            {
                int recognizedAsNumber = int.Parse(recognizedText);

                var bytes = bitmapUtility.ToByteArray(bitmapUtility.Resize(bitmap));

                var entry = new ImageEntry(bytes, recognizedAsNumber);

                if (await continuityManager.TryIncrementCurrentNumber(entry))
                {
                    return ResponseImageViewModelSimpleFactory.GenerateSuccessResponse(recognizedText,
                        expectedNumber);
                }
                else
                {
                    //correct the expected number, as it must've changed
                    expectedNumber = continuityManager.GetCurrentNumber();
                    return ResponseImageViewModelSimpleFactory.GenerateFailureResponse(null, expectedNumber,
                        ErrorMessages.CONCURRENCY);
                }
            }
            else
            {
                string error = string.Format(ErrorMessages.INVALID_NUMBER, expectedText);
                return ResponseImageViewModelSimpleFactory.GenerateFailureResponse(recognizedText, expectedNumber,
                    error);
            }
        }

        private async Task<string> TryRecognizeText(DigitDetectionOptions options, System.Drawing.Bitmap bitmap)
        {
            textExtractor.Initialize(options ?? DigitDetectionOptions.Default, continuityManager.GetCurrentNumber());

            int tries = 10;
            while (tries-- > 0)
            {
                try
                {
                    return textExtractor.GetText(bitmap);
                }
                catch (InvalidOperationException)
                {
                    await Task.Delay(250);
                }
            }

            return null;
        }

    }
}