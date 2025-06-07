using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using Hermes.Application.DTOs;
using Hermes.Domain.Entities;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hermes.Modules.Users.Queries
{
    public sealed class GetAllUsersQueryHandler : HandlerBase, IRequestHandler<GetAllUsersQuery, IEnumerable<UserDto>>
    {
        public GetAllUsersQueryHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<IEnumerable<UserDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await _context.Users
                .Include(u => u.Address)
                .ToListAsync(cancellationToken);
            return _mapper.Map<IEnumerable<UserDto>>(users);

        }
    }
}
