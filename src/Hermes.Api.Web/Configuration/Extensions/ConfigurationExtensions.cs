namespace HermesWebApi.Configuration.Extensions
{
    public static class ConfigurationExtensions
    {
        public static void BindOptions<T>(this IConfiguration configuration, T options)
        {
            string sectionName = typeof(T).Name.Replace("Options", string.Empty);
            configuration.GetSection(sectionName).Bind(options);
        }
    }
}