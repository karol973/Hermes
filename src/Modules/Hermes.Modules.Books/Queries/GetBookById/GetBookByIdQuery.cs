using Hermes.Modules.Books.Models;
using MediatR;

namespace Hermes.Modules.Books.Queries.GetBookById
{
    public sealed class GetBookByIdQuery : IRequest<BookDto>
    {
        public int Id { get; set; }
    }
}
