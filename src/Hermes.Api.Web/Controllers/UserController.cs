using Hermes.Modules.Users.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hermes.Api.Web.Controllers
{
    [Route("api/user")]
    public class UserController : ApiControllerBase
    {
        public UserController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [AllowAnonymous]
        public Task<IActionResult> GetAllAsync()
        {
            return HandleAsync(new GetAllUsersQuery());
        }
    }
}
