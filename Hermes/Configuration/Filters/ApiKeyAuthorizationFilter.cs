using HermesWebApi.Configuration.Options;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;

namespace HermesWebApi.Configuration.Filters
{
    internal sealed class ApiKeyAuthorizationFilter : IAuthorizationFilter
    {
        public const string ApiKeyHeader = "X-Api-Key";

        private readonly IOptions<ApiKeyOptions> _options;

        public ApiKeyAuthorizationFilter(IOptions<ApiKeyOptions> options)
        {
            _options = options;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            context.HttpContext.Request.Headers.TryGetValue(ApiKeyHeader, out StringValues headerValue);

            if (string.IsNullOrEmpty(headerValue))
            {
                HandleUnathorizedRequest(context);
                return;
            }

            if (string.IsNullOrEmpty(_options.Value?.Key))
            {
                HandleUnathorizedRequest(context);
                return;
            }

            if (!string.Equals(_options.Value.Key, headerValue, StringComparison.Ordinal))
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
