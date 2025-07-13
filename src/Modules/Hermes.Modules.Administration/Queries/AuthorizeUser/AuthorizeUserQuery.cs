using Hermes.Domain.Enums;
using MediatR;

namespace Hermes.Modules.Administration.Queries.AuthorizeUser
{
    public sealed class AuthorizeUserQuery : IRequest<bool>
    {
        public string Username { get; set; }
        public Role Role { get; set; }
    }
}
