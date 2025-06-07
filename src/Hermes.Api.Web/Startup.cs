using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Server.IISIntegration;
using HermesWebApi.Configuration.Filters;
using HermesWebApi.Configuration.Swagger;
using HermesWebApi.Configuration;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Persistance;
using Microsoft.Extensions.Logging;  

namespace HermesWebApi;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers(options =>
        {
            options.SuppressAsyncSuffixInActionNames = true;
            options.OutputFormatters.RemoveType<HttpNoContentOutputFormatter>();
        });

        services.AddDbContext<AntiqueShopDbContext>(options =>
            options.UseSqlServer(
                Configuration.GetConnectionString("Hermes"),
                sqlOptions => sqlOptions.MigrationsAssembly(typeof(AntiqueShopDbContext).Assembly.FullName)
            ));

        services.AddRequestLocalization(options =>
        {
            options.DefaultRequestCulture = new RequestCulture(CultureConfiguration.DefaultCulture);
        });

        services.AddCorsSettings();
        services.AddSwaggerDocument();
        services.AddAuthentication(IISDefaults.AuthenticationScheme);
        services.AddAuthorization();
        services.AddApplicationOptions(Configuration);
        services.AddScoped<ApiKeyAuthorizationFilter>();
    }

     public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.ConfigureSwagger();
        }

        logger.LogInformation("App has started.");

        app.UseCors();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseRequestLocalization();
        app.UseEndpoints(endpoints => endpoints.MapControllers());
    }
}
