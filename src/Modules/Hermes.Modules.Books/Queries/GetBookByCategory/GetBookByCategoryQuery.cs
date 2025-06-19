using Hermes.Domain.Enums;
using Hermes.Modules.Books.Models;
using MediatR;

namespace Hermes.Modules.Books.Queries.GetBooksByCategory
{
    public sealed class GetBookByCategoryQuery : IRequest<IEnumerable<BookDto>>
    {
        public BookCategory Category { get; set; }
    }
}
