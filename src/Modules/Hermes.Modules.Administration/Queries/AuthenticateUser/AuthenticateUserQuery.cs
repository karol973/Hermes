using Hermes.Modules.Users.Models.Users;
using MediatR;

namespace Hermes.Modules.Users.Queries.AuthenticateUser
{
   public sealed class AuthenticateUserQuery : IRequest<AuthenticationStatus>
   {
      public string UserName { get; set; }
      public string Password { get; set; }
   }
}
