using Hermes.Modules.Books.Models;
using MediatR;

namespace Hermes.Modules.Books.Queries.GetBookByAuthor
{
   public sealed class GetBookByAuthorQuery : IRequest<IEnumerable<BookDto>>
   {
        public int AuthorId { get; set; }
    }
}
