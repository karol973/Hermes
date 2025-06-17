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

            DateTime currentDate = await _dateTimeProvider.GetDateTimeAsync(cancellationToken);


            if (alreadyExists)
            {
                return Response.Failure($"Book with name '{request.Name}' already exists.");
            }
            var existingAuthor = await _context.Authors
                .FirstOrDefaultAsync(a =>
                a.Name == request.AuthorName &&
                a.Surname == request.AuthorSurname,
                cancellationToken);

            if (existingAuthor == null)
            {
                existingAuthor = new Author
                {
                    Name = request.AuthorName,
                    Surname = request.AuthorSurname,
                    CreateDate = currentDate
                };

                _context.Authors.Add(existingAuthor);
                await _context.SaveChangesAsync(cancellationToken);
            }


            Book bookToCreate = new Book
            {
                Name = request.Name,
                PublishYear = request.PublishYear,
                AuthorId = existingAuthor.Id,
                Price = request.Price,
                BookImage = request.BookImage,
                IsAvailable = true,
                Category = request.Category,
                PublisherId = request.PublisherId,
                CreateDate = currentDate,
                Quantity = request.Quantity,
                AntiqueShopId = 1,
            };

            await _context.Books.AddAsync(bookToCreate);
            await _context.SaveChangesAsync();

            return Response.Success(bookToCreate.Id);

        }
    }
}
