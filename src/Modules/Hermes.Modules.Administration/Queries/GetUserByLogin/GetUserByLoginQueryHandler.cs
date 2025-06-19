using AutoMapper;
using Hermes.Application.DTOs;
using Hermes.Domain.Entities;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hermes.Modules.Administration.Queries.GetUserByLogin
{
    public sealed class GetUserByLoginQueryHandler : HandlerBase, IRequestHandler<GetUserByLoginQuery, UserDto>
    {
        public GetUserByLoginQueryHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<UserDto> Handle(GetUserByLoginQuery request, CancellationToken cancellationToken)
        {
            User existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);

            return _mapper.Map<UserDto>(existingUser);
        }
    }
}
