using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Hermes.Modules.Shared.Response;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Hermes.Modules.Books.Commands.Books.UpdateBook
{
    public class UpdateBookCommandHandler : HandlerBase, IRequestHandler<UpdateBookCommand, Response>
    {
        public UpdateBookCommandHandler(
            IMapper mapper,
            IDateTimeProvider dateTimeProvider,
            AntiqueShopDbContext antiqueShopDbContext
        ) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<Response> Handle(UpdateBookCommand request, CancellationToken cancellationToken)
        {
            Book? bookToUpdate = await _context.Books
                .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);

            if (bookToUpdate is null)
            {
                return Response.Failure($"Book with Id '{request.Id}' was not found.");
            }

            DateTime currentDate = await _dateTimeProvider.GetDateTimeAsync(cancellationToken);

            Author? existingAuthor = await _context.Authors
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
                    ModifyDate = currentDate
                };

                _context.Authors.Add(existingAuthor);
                await _context.SaveChangesAsync(cancellationToken);
            }

            Publisher? existingPublisher = await _context.Publishers
                .FirstOrDefaultAsync(p => p.Name == request.PublisherName, cancellationToken);

            if (existingPublisher == null)
            {
                existingPublisher = new Publisher
                {
                    Name = request.PublisherName,
                    ModifyDate = currentDate
                };

                _context.Publishers.Add(existingPublisher);
                await _context.SaveChangesAsync(cancellationToken);
            }

            bookToUpdate.Name = request.Name;
            bookToUpdate.PublishYear = request.PublishYear;
            bookToUpdate.Price = request.Price;
            bookToUpdate.Quantity = request.Quantity;
            bookToUpdate.IsAvailable = request.IsAvailable;
            bookToUpdate.BookImage = request.BookImage;
            bookToUpdate.AuthorId = existingAuthor.Id;
            bookToUpdate.PublisherId = existingPublisher.Id;
            bookToUpdate.Category = request.Category;
            bookToUpdate.AntiqueShopId = request.AntiqueShopId;
            bookToUpdate.ModifyDate = currentDate;

            await _context.SaveChangesAsync(cancellationToken);

            return Response.Success(bookToUpdate.Id);
        }
    }
}
