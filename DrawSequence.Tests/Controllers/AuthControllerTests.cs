using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using DrawSequence.Commands.Auth.Contract;
using DrawSequence.Controllers;
using DrawSequence.Database;
using DrawSequence.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Moq;
using Xunit;

namespace DrawSequence.Tests.Controllers
{
    public class AuthControllerTests
    {
        [Fact]
        public async Task Login_InvokesILoginCommand()
        {
            var mock = new Mock<ILoginCommand>();
            mock
                .Setup(c => c.ExecuteAsync(It.IsAny<LoginViewModel>(), It.IsAny<ModelStateDictionary>()))
                .Returns(Task.FromResult((IActionResult)null));
            var command = new Lazy<ILoginCommand>(() => mock.Object);
            var controller = new AuthController(command);

            await controller.Login(It.IsAny<LoginViewModel>());

            mock.Verify(c => c.ExecuteAsync(It.IsAny<LoginViewModel>(), It.IsAny<ModelStateDictionary>()));
        }

    }
}
