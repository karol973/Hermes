
using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Hermes.Modules.Shared.Response;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hermes.Modules.Administration.Commands.Users.ChangePassword
{
    public sealed class ChangePasswordCommandHandler : HandlerBase, IRequestHandler<ChangePasswordCommand, Response>
    {
        public ChangePasswordCommandHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<Response> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

            if (user is null)
            {
                return Response.Failure($"User with a name: '{request.Id}' does not exist.");
            }

             user.PasswordHash = request.PasswordHash;
 
            await _context.SaveChangesAsync();

            return Response.Success();
        }
    }
}
