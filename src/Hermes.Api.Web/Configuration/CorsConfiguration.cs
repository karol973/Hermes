namespace HermesWebApi.Configuration
{
    internal static class CorsConfiguration
    {
        public static void AddCorsSettings(this IServiceCollection services)
        {
            services.AddCors(options => options.AddDefaultPolicy(builder =>
            {
                builder
                   //.AllowAnyMethod()
                   //.AllowAnyHeader()
                   //.WithExposedHeaders("Content-Disposition")
                   //.SetIsOriginAllowed(x => true)
                   //.AllowCredentials();
                   .WithOrigins("http://localhost:5173") // <- jawnie dozwolony frontend
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials()
                   .WithExposedHeaders("Content-Disposition");
            }));
        }
    }

}
