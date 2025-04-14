using Microsoft.AspNetCore.Mvc;

namespace HermesWebApi.Configuration.Filters
{
    internal sealed class ApiKeyAuthorizationAttribute : ServiceFilterAttribute
    {
        public ApiKeyAuthorizationAttribute(Type type) : base(type)
        {
        }
    }
}
