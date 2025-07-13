using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Domain.Enums;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hermes.Modules.Administration.Queries.AuthorizeUser
{
    public sealed class AuthorizeUserQueryHandler : HandlerBase, IRequestHandler<AuthorizeUserQuery, bool>
    {
        public AuthorizeUserQueryHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<bool> Handle(AuthorizeUserQuery request, CancellationToken cancellationToken)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);

            if (user?.IsActive != true)
            { 
                return false;
            }

            return user.Role >= request.Role;
        }
    }
}
