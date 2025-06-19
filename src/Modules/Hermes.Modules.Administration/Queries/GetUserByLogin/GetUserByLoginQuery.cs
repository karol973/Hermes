using Hermes.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hermes.Modules.Administration.Queries.GetUserByLogin
{
    public sealed class GetUserByLoginQuery : IRequest<UserDto>
    {
       public string Username { get; init; }
    }
}
