using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Hermes.Modules.Administration.Queries.AuthorizeUser;
using Hermes.Domain.Enums;

namespace HermesWebApi.Configuration.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizationAttribute : AuthorizeAttribute, IAsyncAuthorizationFilter
    {
        private readonly Role _role;

        public AuthorizationAttribute()
        { }

        public AuthorizationAttribute(Role role)
        {
            _role = role;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            Endpoint endpoint = context.HttpContext.GetEndpoint();

            if (endpoint?.Metadata?.GetMetadata<IAllowAnonymous>() != null)
            {
                return;
            }

            string identity = context.HttpContext.User.Identity?.Name;

            if (string.IsNullOrEmpty(identity))
            {
                HandleUnathorizedRequest(context);
                return;
            }

            if (_role == Role.None)
            {
                return;
            }

            IMediator mediator = context.HttpContext.RequestServices.GetService<IMediator>();

            bool result = await mediator.Send(new AuthorizeUserQuery()
            {
                Username = identity,
                Role = _role
            });

            if (!result)
            {
                HandleUnathorizedRequest(context);
                return;
            }
        }

        private void HandleUnathorizedRequest(AuthorizationFilterContext context)
        {
            context.Result = new ForbidResult();
        }
    }
}
