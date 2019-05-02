using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DrawSequence.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DrawSequence.Commands.Auth.Contract
{
    public interface ILoginCommand
    {
        Task<IActionResult> ExecuteAsync(LoginViewModel loginDetails, ModelStateDictionary modelState);
    }
}
