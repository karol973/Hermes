using MediatR.Extensions.Autofac.DependencyInjection.Builder;
using MediatR.Extensions.Autofac.DependencyInjection;
using System.Reflection;
using Autofac;
using AutoMapper.Contrib.Autofac.DependencyInjection;
using AutofacModule = Autofac.Module;


namespace HermesWebApi.Configuration
{
    internal static class ModuleConfiguration
    {
        public static void RegisterApplicationModules(this ContainerBuilder builder, params AutofacModule[] modules)
        {
            ArgumentNullException.ThrowIfNull(builder);
            ArgumentNullException.ThrowIfNull(modules);

            Assembly[] assemblies = modules
               .Select(m => m.GetType().Assembly)
               .ToArray();

            RegisterDependencies(builder, modules);
            RegisterMediatR(builder, assemblies);
            RegisterMappings(builder, assemblies);
           //RegisterValidation(builder, assemblies);
        }

        private static void RegisterDependencies(ContainerBuilder builder, AutofacModule[] modules)
        {
            foreach (AutofacModule module in modules)
            {
                builder.RegisterModule(module);
            }
        }

        private static void RegisterMediatR(ContainerBuilder builder, Assembly[] assemblies)
        {
            //Type[] pipelineTypes = new Type[]
            // {
            //        typeof(IdentityBehavior<,>),
            // };

            MediatRConfiguration configuration = MediatRConfigurationBuilder
               .Create(assemblies)
               .WithAllOpenGenericHandlerTypesRegistered()
               //.WithCustomPipelineBehaviors(pipelineTypes)
               .Build();

            builder.RegisterMediatR(configuration);
        }

        private static void RegisterMappings(ContainerBuilder builder, Assembly[] assemblies)
        {
            builder.RegisterAutoMapper(false, assemblies);
        }

        //private static void RegisterValidation(ContainerBuilder builder, Assembly[] assemblies)
        //{
        //    builder.RegisterAssemblyTypes(assemblies)
        //      .Where(t => t.IsAssignableTo<IValidator>())
        //      .AsImplementedInterfaces()
        //      .InstancePerLifetimeScope();
        //}
    }
}
