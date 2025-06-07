using Hermes.Application.DTOs;
using MediatR;

namespace Hermes.Modules.Users.Queries
{
    public sealed class GetAllUsersQuery : IRequest<IEnumerable<UserDto>>
    {
    }
}
