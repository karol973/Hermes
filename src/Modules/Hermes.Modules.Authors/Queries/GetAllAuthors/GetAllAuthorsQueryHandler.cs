using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Authors.Models;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hermes.Modules.Authors.Queries.GetAllAuthors
{
    public sealed class GetAllAuthorsQueryHandler : HandlerBase, IRequestHandler<GetAllAuthorsQuery, IEnumerable<AuthorDto>>
    {
        public GetAllAuthorsQueryHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<IEnumerable<AuthorDto>> Handle(GetAllAuthorsQuery request, CancellationToken cancellationToken)
        {
            List<Author> authors = await _context.Authors
                 .Include(a => a.Books)
                    .ThenInclude(b => b.Publisher)
                 .Include(a => a.Books)
                    .ThenInclude(b => b.AntiqueShop)
                .ToListAsync(cancellationToken);

            return _mapper.Map<IEnumerable<AuthorDto>>(authors);
        }
    }
}
