using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog;
using NLog.Web;
using System;
using System.IO;

namespace HermesWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
             var nlogConfigPath = Path.Combine(Directory.GetCurrentDirectory(), "nlog.config");

             var logger = NLogBuilder.ConfigureNLog(nlogConfigPath).GetCurrentClassLogger();

            try
            {
                logger.Info("Application starting...");
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                logger.Fatal(ex, "Application terminated due to unexpected error");
                throw;
            }
            finally
            {
                LogManager.Shutdown();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
                })

                .UseNLog();  
    }
}
