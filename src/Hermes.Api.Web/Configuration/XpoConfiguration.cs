using DevExpress.Xpo.DB;
using DevExpress.Xpo;
using System.Reflection;

namespace HermesWebApi.Configuration
{
    public static class XpoConfiguration
    {
        public static void AddXpo(this IServiceCollection services, string connectionString)
        {
            services.AddXpoDefaultUnitOfWork(true, options =>
               options
                  .UseConnectionString(connectionString)
                  .UseAutoCreationOption(AutoCreateOption.SchemaAlreadyExists)
                  //.UseEntityTypes(GetPersistentTypes())
                  .UseNullableBehavior(NullableBehavior.ByUnderlyingType)
            );
        }

        //private static Type[] GetPersistentTypes()
        //{
        //    Assembly domainAssembly = typeof(User).Assembly;
        //    return domainAssembly.FindDerivedTypes(typeof(XPBaseObject)).ToArray();
        //}
    }
}
