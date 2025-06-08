using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Hermes.Modules.Shared.Response;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hermes.Modules.Books.Commands.Books.CreateBook
{
    public class CreateBookCommandHandler : HandlerBase, IRequestHandler<CreateBookCommand, Response>
    {
        public CreateBookCommandHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<Response> Handle(CreateBookCommand request, CancellationToken cancellationToken)
        {
            bool alreadyExists = await _context.Books.AnyAsync(b => b.Name == request.Name, cancellationToken);

            if (alreadyExists)
            {
                return Response.Failure($"Book with name '{request.Name}' already exists.");
            }

            DateTime currentDate = await _dateTimeProvider.GetDateTimeAsync(cancellationToken);

            Book bookToCreate = new Book
            {
                Name = request.Name,
                PublishYear = request.PublishYear,
                AuthorId = request.AuthorId,
                Price = request.Price,
                IsAvailable = true,
                Category = request.Category,
                PublisherId = request.PublisherId,
                CreateDate = currentDate,
                Quantity = request.Quantity,
                AntiqueShopId = request.AntiqueShopId,
            };

            await _context.Books.AddAsync(bookToCreate);
            await _context.SaveChangesAsync();

            return Response.Success(bookToCreate.Id);

        }
    }
}
