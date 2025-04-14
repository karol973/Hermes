using HermesWebApi.Configuration.Filters;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace HermesWebApi.Configuration.Swagger
{
    public class ApiKeyOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            operation.Parameters ??= new List<OpenApiParameter>();

            operation.Parameters.Add(new OpenApiParameter
            {
                Name = ApiKeyAuthorizationFilter.ApiKeyHeader,
                In = ParameterLocation.Header,
                Required = false
            });
        }
    }
}
