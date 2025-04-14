using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Server.IISIntegration;
using HermesWebApi.Configuration.Filters;
using HermesWebApi.Configuration.Swagger;
using HermesWebApi.Configuration;
using Autofac;
using HermesWebApi.Configuration.Autofac;


namespace HermesWebApi;
public class Startup
{
    public IConfiguration Configuration { get; }
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, NLog.ILogger logger)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.ConfigureSwagger();
        }

        //app.UseErrorHandler(logger);
        app.UseCors();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseRequestLocalization();
        app.UseEndpoints(endpoints => endpoints.MapControllers());
        //app.UseDefaultCulture();
    }
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers(options =>
        {
            options.SuppressAsyncSuffixInActionNames = true;
            options.OutputFormatters.RemoveType<HttpNoContentOutputFormatter>();
        });

        services.AddRequestLocalization(options =>
        {
            options.DefaultRequestCulture = new RequestCulture(CultureConfiguration.DefaultCulture);
        });

        services.AddCorsSettings();
        services.AddSwaggerDocument();
        services.AddAuthentication(IISDefaults.AuthenticationScheme);
        services.AddAuthorization();
        //services.AddValidation();
        services.AddApplicationOptions(Configuration);
        services.AddXpo(Configuration.GetConnectionString("HermesDb") ?? string.Empty);
        services.AddScoped<ApiKeyAuthorizationFilter>();
    }

    public void ConfigureContainer(ContainerBuilder builder)
    {
        builder.RegisterModule(new ApiModule());

        builder.RegisterApplicationModules(
          // new AdministrationModule(),
          // new MasterDataModule()
        );
    }
}

 
