using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Hermes.Modules.Users.Models.Users;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hermes.Modules.Users.Queries.AuthenticateUser
{
    public sealed class AuthenticateUserQueryHandler : HandlerBase, IRequestHandler<AuthenticateUserQuery, AuthenticationStatus>
    {
        public AuthenticateUserQueryHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<AuthenticationStatus> Handle(AuthenticateUserQuery request, CancellationToken cancellationToken)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.UserName, cancellationToken);

            if (user == null || user.PasswordHash != request.Password || !user.IsActive)
            {
                return new AuthenticationStatus()
                {
                    IsSuccess = false
                };
            }

            if (!string.Equals(user.PasswordHash, request.Password, StringComparison.Ordinal))
            {
                return new AuthenticationStatus()
                {
                    IsSuccess = false
                };
            }

            return new AuthenticationStatus()
            {
                IsSuccess = true,
                Username = user.Username,
                Role = user.Role,
                Id = user.Id
            };
        }
    }
}
