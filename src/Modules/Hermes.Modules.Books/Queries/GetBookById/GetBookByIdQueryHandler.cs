using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Books.Models;
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
using static System.Reflection.Metadata.BlobBuilder;

namespace Hermes.Modules.Books.Queries.GetBookById
{
    public sealed class GetBookByIdQueryHandler : HandlerBase, IRequestHandler<GetBookByIdQuery, BookDto>
    {
        public GetBookByIdQueryHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<BookDto> Handle(GetBookByIdQuery request, CancellationToken cancellationToken)
        {
            Book? book = await _context.Books
                .Include(b => b.Author)
                .Include(b => b.Publisher)
                .Include(b => b.AntiqueShop)
                .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);

            if (book is null)
            {
                Response.Failure($"Book with '{request.Id}' does not exist.");
            }

            return _mapper.Map<BookDto>(book);
        }
    }
}
