using Hermes.Domain.Enums;
using Hermes.Modules.Shared.Response;
using MediatR;

namespace Hermes.Modules.Administration.Commands.Users.ChangePassword
{
    public sealed class ChangePasswordCommand : IRequest<Response>
    {
        public int Id { get; set; }
        public string PasswordHash { get; set; } = string.Empty;

    }
}
