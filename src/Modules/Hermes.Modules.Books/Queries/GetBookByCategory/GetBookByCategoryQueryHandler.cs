using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Books.Models;
using Hermes.Modules.Books.Queries.GetBooksByCategory;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hermes.Modules.Books.Queries.GetBookByCategory
{
    public sealed class GetBookByCategoryQueryHandler : HandlerBase, IRequestHandler<GetBookByCategoryQuery, IEnumerable<BookDto>>
    {
        public GetBookByCategoryQueryHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<IEnumerable<BookDto>> Handle(GetBookByCategoryQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Book> books = await _context.Books
                .Where(b => b.Category == request.Category)
                .OrderBy(b => b.Name)
                .ToListAsync();

            return _mapper.Map<IEnumerable<BookDto>>(books);
        }
    }
}
