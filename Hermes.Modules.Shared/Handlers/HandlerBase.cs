using AutoMapper;
using Hermes.Modules.Shared.Providers;
using Infrastructure.Persistence;

namespace Hermes.Modules.Shared.Handlers
{
    public abstract class HandlerBase
    {
        protected readonly IMapper _mapper;
        protected readonly IDateTimeProvider _dateTimeProvider;
        protected readonly AntiqueShopDbContext _context;


        public HandlerBase(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext)
        {
            _mapper = mapper;
            _dateTimeProvider = dateTimeProvider;
            _context = antiqueShopDbContext;
        }
    }
}
