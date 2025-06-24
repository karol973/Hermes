namespace HermesWebApi.Configuration
{
    internal static class CorsConfiguration
    {
        public static void AddCorsSettings(this IServiceCollection services)
        {
            services.AddCors(options => options.AddDefaultPolicy(builder =>
            {
                builder
                   .WithOrigins("https://hermes-web.azurewebsites.net", "http://localhost:5173")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials()
                   .WithExposedHeaders("Content-Disposition");
            }));
        }
    }

}
