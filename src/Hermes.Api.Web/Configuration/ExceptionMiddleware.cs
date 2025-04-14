using Microsoft.AspNetCore.Diagnostics;
using System.Net;

namespace HermesWebApi.Configuration
{
    internal static class ExceptionMiddleware
    {
        internal static void UseErrorHandler(this IApplicationBuilder app, NLog.ILogger logger)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    IExceptionHandlerFeature contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                    logger.Fatal(contextFeature.Error, "Internal server error.");
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                    await context.Response.WriteAsync("Internal server error.");
                });
            });
        }
    }
}
