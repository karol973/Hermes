using Hermes.Domain.Enums;
using Hermes.Shared.Enums;
using MediatR;

namespace Hermes.Modules.Books.Queries.GetBookCategory
{
    public sealed class GetBookCategoryQueryHandler : IRequestHandler<GetBookCategoryQuery, IEnumerable<KeyValuePair<int, string>>>
    {
        public Task<IEnumerable<KeyValuePair<int, string>>> Handle(GetBookCategoryQuery request, CancellationToken cancellationToken)
        {
            return Task.FromResult(EnumHelper<BookCategory>.GetValues(true));
        }
    }
}
