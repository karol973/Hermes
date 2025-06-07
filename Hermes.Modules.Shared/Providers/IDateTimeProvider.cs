using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hermes.Modules.Shared.Providers
{
    public interface IDateTimeProvider : IProvider
    {
        Task<DateTime> GetDateTimeAsync(CancellationToken cancellationToken);
    }
}

