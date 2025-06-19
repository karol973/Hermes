using MediatR;

namespace Hermes.Modules.Books.Queries.GetBookCategory
{
    public sealed class GetBookCategoryQuery : IRequest<IEnumerable<KeyValuePair<int, string>>>
    {
    }
}
