using Hermes.Modules.Shared.Providers;

namespace HermesWebApi.Configuration.Externals
{
    public class DateTimeProvider 
        : IDateTimeProvider
    {
    public DateTimeProvider()
    { }
    public Task<DateTime> GetDateTimeAsync(CancellationToken cancellationToken) => Task.FromResult(DateTime.Now);

    }
}