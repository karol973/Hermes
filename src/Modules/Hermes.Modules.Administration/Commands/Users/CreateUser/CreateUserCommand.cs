using Hermes.Domain.Enums;
using Hermes.Modules.Shared.Response;
using Hermes.Modules.Users.Models.Address;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hermes.Modules.Users.Commands.Users.CreateUser
{
    public class CreateUserCommand : IRequest<Response>
    {
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        //public string Role { get; set; } = string.Empty;
        public Role Role { get; set; } = Role.User;  
        public bool IsActive { get; set; }
        public AddressDto? Address { get; set; }

    }
}
