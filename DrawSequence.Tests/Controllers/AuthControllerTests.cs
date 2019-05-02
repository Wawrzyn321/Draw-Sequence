using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using DrawSequence.Commands.Auth.Contract;
using DrawSequence.Controllers;
using DrawSequence.Controllers.Contract;
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
            var loginCommandMock = new Mock<ILoginCommand>();
            loginCommandMock
                .Setup(c => c.ExecuteAsync(It.IsAny<LoginViewModel>(), It.IsAny<ModelStateDictionary>()))
                .Returns(Task.FromResult((IActionResult)null));
            var loginCommand = new Lazy<ILoginCommand>(() => loginCommandMock.Object);

            var changePasswordCommandMock = new Mock<IChangePasswordCommand>();
            var changePasswordCommand = new Lazy<IChangePasswordCommand>(() => changePasswordCommandMock.Object);

            var controller = new AuthController(loginCommand, changePasswordCommand);

            await controller.Login(It.IsAny<LoginViewModel>());

            loginCommandMock.Verify(c => c.ExecuteAsync(It.IsAny<LoginViewModel>(), It.IsAny<ModelStateDictionary>()));
        }

    }
}
