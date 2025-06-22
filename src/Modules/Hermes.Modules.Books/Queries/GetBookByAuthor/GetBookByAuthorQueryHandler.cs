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

namespace Hermes.Modules.Books.Queries.GetBookByAuthor
{
   public sealed class GetBookByAuthorQueryHandler : HandlerBase, IRequestHandler<GetBookByAuthorQuery, IEnumerable<BookDto>>
   {
      public GetBookByAuthorQueryHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
      {
      }

      public async Task<IEnumerable<BookDto>> Handle(GetBookByAuthorQuery request, CancellationToken cancellationToken)
      {
         List<Book> books = await _context.Books
             .Where(b => b.AuthorId == request.AuthorId)
            .Include(b => b.Author)
            .Include(b => b.Publisher)
            .Include(b => b.AntiqueShop)
            .OrderBy(b => b.Name)
            .ToListAsync(cancellationToken);

         if (!books.Any())
         {
            Response.Failure($"There is not any books assign to author '{request.AuthorId}'.");
         }

         return _mapper.Map<IEnumerable<BookDto>>(books);
      }
   }
}
