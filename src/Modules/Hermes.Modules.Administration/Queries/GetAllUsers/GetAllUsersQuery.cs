using Hermes.Application.DTOs;
using MediatR;

namespace Hermes.Modules.Administration.Queries.GetAllUsers
{
    public sealed class GetAllUsersQuery : IRequest<IEnumerable<UserDto>>
    {
    }
}
