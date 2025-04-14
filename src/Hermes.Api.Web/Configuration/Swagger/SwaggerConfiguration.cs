using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace HermesWebApi.Configuration.Swagger
{
    internal static class SwaggerConfiguration
    {
        public static void ConfigureSwagger(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.DefaultModelsExpandDepth(-1);
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Hermes Web API V1");
            });
        }

        public static void AddSwaggerDocument(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.OrderActionsBy(ActionSorter);
                options.SwaggerDoc("v1", new OpenApiInfo()
                {
                    Version = "v1",
                    Title = "Hermes Web API",
                    Contact = new OpenApiContact
                    {
                        Name = "Antykwariat"
                    },
                    License = new OpenApiLicense
                    {
                        Name = $"Copyright © Antykwariat {DateTime.Today.Date}"
                    }
                });
                options.OperationFilter<ApiKeyOperationFilter>();
            });
        }

        private static string ActionSorter(ApiDescription description) =>
           description.HttpMethod.ToUpper() switch
           {
               "GET" => "1",
               "POST" => "2",
               "PUT" => "3",
               "PATCH" => "4",
               "DELETE" => "5",
               _ => ""
           };
    }

}
