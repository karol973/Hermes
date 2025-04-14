using Autofac;
using AutofacModule = Autofac.Module;


namespace HermesWebApi.Configuration.Autofac

{
    internal sealed class ApiModule : AutofacModule
    {
        protected override void Load(ContainerBuilder builder)
        {
            RegisterExternals(builder);
        }

        private void RegisterExternals(ContainerBuilder builder)
        {
        //    builder.RegisterAssemblyTypes(ThisAssembly)
        //       .Where(t => t.IsAssignableTo<IProvider>())
        //       .AsImplementedInterfaces()
        //       .InstancePerLifetimeScope();
        }
    }
}

