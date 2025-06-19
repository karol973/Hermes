using Hermes.Domain.Enums;

namespace Hermes.Api.Web.Authentication
{
    public sealed class AuthenticationResult
    {
        public bool IsSuccess { get; init; }
        public string Username { get; init; }
        public Role Role { get; init; }

        public static AuthenticationResult Success(string username, Role role) => new()
        {
            IsSuccess = true,
            Username = username,
            Role = role
        };

        public static AuthenticationResult Failure() => new()
        {
            IsSuccess = false
        };
    }
}
