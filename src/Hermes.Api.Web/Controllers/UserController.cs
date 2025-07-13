using Hermes.Domain.Enums;
using Hermes.Modules.Administration.Commands.Users.ChangePassword;
using Hermes.Modules.Administration.Commands.Users.UpdateUser;
using Hermes.Modules.Administration.Queries.GetAllUsers;
using Hermes.Modules.Users.Commands.Users.CreateUser;
using Hermes.Modules.Users.Queries;
using HermesWebApi.Configuration.Filters;
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
        
        [HttpPost]
        [Authorization(Role.SuperUser)]
        public Task<IActionResult> CreateAsync([FromBody] CreateUserCommand command)
        {
            return HandleAsync(command);
        }
        [HttpPatch("{id:int}")]
        [Authorization(Role.SuperUser)]
        public Task<IActionResult> UpdateUserAsync(int id, [FromBody] UpdateUserCommand command)
        {
            command.Id = id;
            return HandleAsync(command);
        }
    }
}
