using Hermes.Api.Web.Authentication;
using Hermes.Modules.Users.Queries.AuthenticateUser;
using HermesWebApi.Configuration.Filters;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hermes.Api.Web.Controllers
{
    [Route("api/account")]
    public class AccountController : ApiControllerBase
    {
        private readonly IAuthenticationHandler _authenticationHandler;

        public AccountController(IMediator mediator, IAuthenticationHandler authenticationHandler) : base(mediator)
        {
            _authenticationHandler = authenticationHandler;
        }

        [HttpPost("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> SignInAsync([FromBody] AuthenticateUserQuery query)
        {
            AuthenticationResult result = await _authenticationHandler.SignInAsync(query);
            return Ok(result);
        }

        [HttpPost("signout")]
        [Authorization]
        public async Task<IActionResult> SignOutAsync()
        {
            await _authenticationHandler.SignOutAsync();
            return Ok(true);
        }

        [HttpGet("authorization")]
        [Authorization]
        public IActionResult CheckAuthorization()
        {
            return Ok(true);
        }
    }
}
