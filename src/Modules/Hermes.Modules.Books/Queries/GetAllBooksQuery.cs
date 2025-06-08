using Hermes.Modules.Books.Models;
using MediatR;

namespace Hermes.Modules.Books.Queries
{
    public sealed class GetAllBooksQuery : IRequest<IEnumerable<BookDto>>
    {
    }
}
