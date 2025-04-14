namespace HermesWebApi.Configuration
{
    internal static class CorsConfiguration
    {
        public static void AddCorsSettings(this IServiceCollection services)
        {
            services.AddCors(options => options.AddDefaultPolicy(builder =>
            {
                builder
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .WithExposedHeaders("Content-Disposition")
                   .SetIsOriginAllowed(x => true)
                   .AllowCredentials();
            }));
        }
    }

}
