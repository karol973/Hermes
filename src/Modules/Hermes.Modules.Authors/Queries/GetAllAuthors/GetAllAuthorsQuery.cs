using Hermes.Modules.Authors.Models;
using MediatR;

namespace Hermes.Modules.Authors.Queries.GetAllAuthors
{
    public sealed class GetAllAuthorsQuery : IRequest<IEnumerable<AuthorDto>>
    {
    }
}
