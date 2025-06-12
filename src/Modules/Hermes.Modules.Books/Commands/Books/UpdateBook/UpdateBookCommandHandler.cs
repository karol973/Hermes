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
        public UpdateBookCommandHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<Response> Handle(UpdateBookCommand request, CancellationToken cancellationToken)
        {
            Book bookToUpdate = await _context.Books.FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);

            if (bookToUpdate is null)
            {
                return Response.Failure($"Book with name '{request.Id}' and Id already exists.");
            }

            DateTime currentDate = await _dateTimeProvider.GetDateTimeAsync(cancellationToken);

            bookToUpdate.Name = request.Name;
            bookToUpdate.PublishYear = request.PublishYear;
            bookToUpdate.Price = request.Price;
            bookToUpdate.Quantity = request.Quantity;
            bookToUpdate.IsAvailable = request.IsAvailable;
            bookToUpdate.BookImage = request.BookImage;
            bookToUpdate.AuthorId = request.AuthorId;
            bookToUpdate.PublisherId = request.PublisherId;
            bookToUpdate.Category = request.Category;
            bookToUpdate.AntiqueShopId = request.AntiqueShopId;
            bookToUpdate.ModifyDate = currentDate;

            await _context.SaveChangesAsync();

            return Response.Success(bookToUpdate.Id);

        }
    }
}
