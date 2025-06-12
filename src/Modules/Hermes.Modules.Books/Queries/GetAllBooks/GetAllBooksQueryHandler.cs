using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Books.Models;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hermes.Modules.Books.Queries.GetAllBooks
{
    public sealed class GetAllBooksQueryHandler : HandlerBase, IRequestHandler<GetAllBooksQuery, IEnumerable<BookDto>>
    {
        public GetAllBooksQueryHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<IEnumerable<BookDto>> Handle(GetAllBooksQuery request, CancellationToken cancellationToken)
        {
            List<Book> books = await _context.Books
                .Include(b => b.Author)
                .Include(b => b.Publisher)
                .Include(b => b.AntiqueShop)
                .Include(b => b.OrderItems)
                .ToListAsync(cancellationToken);

            return _mapper.Map<IEnumerable<BookDto>>(books);
        }
    }
}
