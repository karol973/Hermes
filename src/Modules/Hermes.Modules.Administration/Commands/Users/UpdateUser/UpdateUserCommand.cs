using Hermes.Domain.Enums;
using Hermes.Modules.Shared.Response;
using MediatR;

namespace Hermes.Modules.Administration.Commands.Users.UpdateUser
{
    public sealed class UpdateUserCommand : IRequest<Response>
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public Role Role { get; set; }
    }
}
