using HermesWebApi.Configuration.Extensions;
using HermesWebApi.Configuration.Options;

namespace HermesWebApi.Configuration
{
    internal static class OptionConfiguration
    {
        public static void AddApplicationOptions(this IServiceCollection services, IConfiguration configuration)
        {
            //services.Configure<SmtpOptions>(options =>
            //{
            //    configuration.BindOptions(options);
            //});

            services.Configure<ApiKeyOptions>(options =>
            {
                configuration.BindOptions(options);
            });
        }
    }
}
