using Hermes.Domain.Enums;

namespace Hermes.Api.Web.Authentication
{
    public sealed class AuthenticationResult
    {
        public bool IsSuccess { get; init; }
        public int Id { get; init; }
        public string Username { get; init; }
        public Role Role { get; init; }

        public static AuthenticationResult Success(int id,string username, Role role) => new()
        {
            IsSuccess = true,
            Id = id,
            Username = username,
            Role = role
        };

        public static AuthenticationResult Failure() => new()
        {
            IsSuccess = false
        };
    }
}
