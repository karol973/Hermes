namespace HermesWebApi.Configuration
{
    internal static class CorsConfiguration
    {
        public static void AddCorsSettings(this IServiceCollection services)
        {
            services.AddCors(options => options.AddDefaultPolicy(builder =>
            {
                builder
                   .WithOrigins("https://red-hill-0e7791503.6.azurestaticapps.net", "http://localhost:5173")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials()
                   .WithExposedHeaders("Content-Disposition");
            }));
        }
    }

}
