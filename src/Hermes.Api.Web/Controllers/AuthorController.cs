using Hermes.Modules.Authors.Queries.GetAllAuthors;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hermes.Api.Web.Controllers
{
    [Route("api/authors")]
    public class AuthorController : ApiControllerBase
    {
        public AuthorController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [AllowAnonymous]
        public Task<IActionResult> GetAllAuthors()
        {
            return HandleAsync(new GetAllAuthorsQuery());
        }
    }
}
