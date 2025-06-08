using Hermes.Modules.Books.Commands.Books.CreateBook;
using Hermes.Modules.Books.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hermes.Api.Web.Controllers
{
    [Route("api/book")]
    public class BookController : ApiControllerBase
    {
        public BookController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [AllowAnonymous]
        public Task<IActionResult> GetAllAsync()
        {
            return HandleAsync(new GetAllBooksQuery());
        }

        [HttpPost]
        [AllowAnonymous]
        public Task<IActionResult> CreateAsync([FromBody] CreateBookCommand command)
        {
            return HandleAsync(command);
        }
    }
}
