using Hermes.Domain.Enums;

namespace Hermes.Modules.Users.Models.Users
{
   public sealed class AuthenticationStatus
   {
      public AuthenticationStatus()
      {
      }
      public AuthenticationStatus(bool isAuthenticated)
      {
         IsSuccess = isAuthenticated;
      }
      public bool IsSuccess { get; set; }
      public string Username { get; init; }
      public int Id { get; init; }
      public Role Role { get; init; }
   }
}
