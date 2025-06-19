using Hermes.Modules.Users.Models.Users;
using Hermes.Modules.Users.Queries.AuthenticateUser;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Identity.Client;
using System.Security.Claims;

namespace Hermes.Api.Web.Authentication
{
    internal sealed class AuthenticationHandler : IAuthenticationHandler
    {
        private readonly IMediator _mediator;
        private readonly IHttpContextAccessor _contextAccessor;

        public AuthenticationHandler(IMediator mediator, IHttpContextAccessor contextAccessor)
        {
            _mediator = mediator;
            _contextAccessor = contextAccessor;
        }

        public async Task<AuthenticationResult> SignInAsync(AuthenticateUserQuery query)
        {
            if (_contextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                await SignOutAsync();
            }

            AuthenticationStatus authStatus = await _mediator.Send(query);

            if (!authStatus.IsSuccess)
            {
                return AuthenticationResult.Failure();
            }

            IEnumerable<Claim> claims = new[]
            {
            new Claim(ClaimTypes.Name, query.UserName)
         };

            ClaimsIdentity identity = new(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            AuthenticationProperties properties = new()
            {
                IsPersistent = true
            };

            await _contextAccessor.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity), properties);

            return AuthenticationResult.Success(authStatus.Username, authStatus.Role);
        }

        public Task SignOutAsync()
        {
            if (!_contextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                return Task.CompletedTask;
            }

            return _contextAccessor.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}
