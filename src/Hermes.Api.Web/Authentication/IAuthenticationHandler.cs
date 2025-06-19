using Hermes.Modules.Users.Queries.AuthenticateUser;
using Microsoft.Identity.Client;

namespace Hermes.Api.Web.Authentication
{
    public interface IAuthenticationHandler
    {
        Task<AuthenticationResult> SignInAsync(AuthenticateUserQuery query);
        Task SignOutAsync();

    }
}
