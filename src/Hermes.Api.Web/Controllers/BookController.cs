using Hermes.Modules.Books.Commands.Books.CreateBook;
using Hermes.Modules.Books.Queries.GetAllBooks;
using Hermes.Modules.Books.Queries.GetBookById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hermes.Api.Web.Controllers
{
    [Route("api/books")]
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

        [HttpGet("{id:int}/bookdetails")]
        [AllowAnonymous]
        public Task<IActionResult> GetBookByIdAsync(int id)
        {
            return HandleAsync(new GetBookByIdQuery() { Id = id });
        }

        [HttpPost]
        [AllowAnonymous]
        public Task<IActionResult> CreateAsync([FromBody] CreateBookCommand command)
        {
            return HandleAsync(command);
        }
    }
}
