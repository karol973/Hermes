using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Hermes.Modules.Shared.Response;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hermes.Modules.Administration.Commands.Users.UpdateUser
{
    public sealed class UpdateUserCommandHandler : HandlerBase, IRequestHandler<UpdateUserCommand, Response>
    {
        public UpdateUserCommandHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<Response> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

            if (user is null)
            {
                return Response.Failure($"User with a name: '{request.Username}' does not exist.");
            }

            user.Username = request.Username;
            user.Role = request.Role;
            user.IsActive = request.IsActive;

            await _context.SaveChangesAsync();

            return Response.Success();
        }
    }
}
