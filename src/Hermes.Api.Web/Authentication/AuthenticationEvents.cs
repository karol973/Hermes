using Hermes.Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Hermes.Api.Web.Configuration.Options;
using Hermes.Modules.Administration.Queries.GetUserByLogin;
using System.Security.Claims;

namespace Hermes.Api.Web.Authentication
{
    internal sealed class AuthenticationEvents : CookieAuthenticationEvents
    {
        private readonly IOptions<AuthCookieOptions> _options;
        private readonly IMediator _mediator;

        public AuthenticationEvents(IOptions<AuthCookieOptions> options, IMediator mediator)
        {
            _options = options;
            _mediator = mediator;
        }

        public override async Task CheckSlidingExpiration(CookieSlidingExpirationContext context)
        {
            await base.CheckSlidingExpiration(context);

            if (!context.ShouldRenew)
            {
                return;
            }

            string issuedUtc = context.Options.Cookie.Extensions.FirstOrDefault();

            if (!long.TryParse(issuedUtc, out long issuedUtcTicks))
            {
                context.ShouldRenew = false;
                return;
            }

            DateTimeOffset issuedUtcDate = new(issuedUtcTicks, TimeSpan.Zero);

            if (DateTimeOffset.UtcNow.AddMinutes(_options.Value.ExpirationMinutes) - issuedUtcDate > TimeSpan.FromMinutes(_options.Value.AbsoluteExpirationMinutes))
            {
                context.ShouldRenew = false;
                return;
            }
        }

        public override async Task ValidatePrincipal(CookieValidatePrincipalContext context)
        {
            //var userIdClaim = context.Principal.FindFirst(ClaimTypes.NameIdentifier);

            //UserDto user = await _mediator.Send(new GetUserByLoginQuery()
            //{
            //    Username = context.Principal.Identity.Name,
            // });

            //if (user?.IsActive == true)
            //{
            //    return;
            //}

            //context.RejectPrincipal();
            //await context.HttpContext.SignOutAsync();

            var userIdClaim = context.Principal.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                context.RejectPrincipal();
                await context.HttpContext.SignOutAsync();
                return;
            }

            // Użyj ID zamiast nazwy użytkownika do zapytania
            UserDto user = await _mediator.Send(new GetUserByLoginQuery
            {
                Id = userId  
            });

            if (user?.IsActive == true)
            {
                return;
            }

            context.RejectPrincipal();
            await context.HttpContext.SignOutAsync();
        }

        public override Task RedirectToLogin(RedirectContext<CookieAuthenticationOptions> context)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }

        public override Task RedirectToAccessDenied(RedirectContext<CookieAuthenticationOptions> context)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }
    }
}
