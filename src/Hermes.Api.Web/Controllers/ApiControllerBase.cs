using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Hermes.Api.Web.Controllers
{
    [ApiController]
    public abstract class ApiControllerBase : ControllerBase
    {
        protected readonly IMediator _mediator;

        public ApiControllerBase(IMediator mediator)
        {
            _mediator = mediator;
        }

        protected async Task<IActionResult> HandleAsync(IBaseRequest request)
        {
            return Ok(await _mediator.Send(request, HttpContext.RequestAborted));
        }
    }
}
