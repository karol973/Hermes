using Hermes.Modules.Books.Models;
using MediatR;

namespace Hermes.Modules.Books.Queries.GetAllBooks
{
    public sealed class GetAllBooksQuery : IRequest<IEnumerable<BookDto>>
    {
    }
}
