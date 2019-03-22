using System;
using System.Threading.Tasks;
using DrawSequence.Application.ImageProcessing;
using DrawSequence.Commands.Image.Contract;
using DrawSequence.Controllers;
using DrawSequence.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Moq;
using Xunit;

namespace DrawSequence.Tests.Controllers
{
    public class ImageControllerTests
    {
        [Fact]
        public async Task Upload_InvokesIUploadCommand()
        {
            var mock = new Mock<IUploadImageCommand>();
            mock
                .Setup(c => c.ExecuteAsync(It.IsAny<UploadImageViewModel>(),
                    It.IsAny<DigitDetectionOptions>(),
                    It.IsAny<ModelStateDictionary>()))
                .Returns(Task.FromResult((IActionResult)null));
            var command = new Lazy<IUploadImageCommand>(() => mock.Object);
            var controller = new ImageController(null, null, null, command);

            await controller.UploadImage(It.IsAny<UploadImageViewModel>(), It.IsAny<DigitDetectionOptions>());

            mock.Verify(c => c.ExecuteAsync(It.IsAny<UploadImageViewModel>(), It.IsAny<DigitDetectionOptions>(), It.IsAny<ModelStateDictionary>()));
        }

        [Fact]
        public async Task Get_InvokesIGetImagesCommand()
        {
            var mock = new Mock<IGetImagesCommand>();
            mock
                .Setup(c => c.ExecuteAsync(It.IsAny<int>(), It.IsAny<int>()))
                .Returns(Task.FromResult((IActionResult)null));
            var command = new Lazy<IGetImagesCommand>(() => mock.Object);
            var controller = new ImageController(null, null, command, null);

            await controller.Get(It.IsAny<int>(), It.IsAny<int>());

            mock.Verify(c => c.ExecuteAsync(It.IsAny<int>(), It.IsAny<int>()));
        }

        [Fact]
        public async Task Get_InvokesIGetImagesCountCommand()
        {
            var mock = new Mock<IGetImagesCountCommand>();
            mock
                .Setup(c => c.ExecuteAsync())
                .Returns(Task.FromResult((IActionResult)null));
            var command = new Lazy<IGetImagesCountCommand>(() => mock.Object);
            var controller = new ImageController(command, null, null, null);

            await controller.GetCount();

            mock.Verify(c => c.ExecuteAsync());
        }

        [Fact]
        public async Task Get_InvokesIDeleteImagesCountCommand()
        {
            var mock = new Mock<IDeleteImagesCommand>();
            mock
                .Setup(c => c.ExecuteAsync(It.IsAny<int>()))
                .Returns(Task.FromResult((IActionResult)null));
            var command = new Lazy<IDeleteImagesCommand>(() => mock.Object);
            var controller = new ImageController(null, command, null, null);

            await controller.DeleteImages(It.IsAny<int>());

            mock.Verify(c => c.ExecuteAsync(It.IsAny<int>()));
        }
    }
}
