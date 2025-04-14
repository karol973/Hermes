using Microsoft.AspNetCore.Localization;
using System.Globalization;

namespace HermesWebApi.Configuration
{
    internal static class CultureConfiguration
    {
        public static readonly CultureInfo DefaultCulture = CultureInfo.GetCultureInfo("en-US");

        public static void UseDefaultCulture(this IApplicationBuilder app)
        {
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture(DefaultCulture),
                SupportedCultures = new[] { DefaultCulture, CultureInfo.GetCultureInfo("pl-PL") },
                SupportedUICultures = new[] { DefaultCulture, CultureInfo.GetCultureInfo("pl-PL") },
                FallBackToParentCultures = false
            });
        }
    }
}
