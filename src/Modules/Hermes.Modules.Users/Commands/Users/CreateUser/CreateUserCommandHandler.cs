using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Shared.Handlers;
using Hermes.Modules.Shared.Providers;
using Hermes.Modules.Shared.Response;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;

namespace Hermes.Modules.Users.Commands.Users.CreateUser
{
    public class CreateUserCommandHandler : HandlerBase, IRequestHandler<CreateUserCommand, Response>
    {
        public CreateUserCommandHandler(IMapper mapper, IDateTimeProvider dateTimeProvider, AntiqueShopDbContext antiqueShopDbContext) : base(mapper, dateTimeProvider, antiqueShopDbContext)
        {
        }

        public async Task<Response> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);

            if (user is null)
            {
                return Response.Failure($"User with a login '{request.Username}' does not exist.");
            }

            bool alreadyExists = await _context.Users.AnyAsync(u => u.Username == request.Username, cancellationToken);

            if (alreadyExists)
            {
                return Response.Failure($"User with login '{request.Username}' already exists.");
            }

            DateTime currentDate = await _dateTimeProvider.GetDateTimeAsync(cancellationToken);

            User userToCreate = new User
            {
                Username = request.Username,
                PasswordHash = request.Password,
                Role = request.Role,
                IsActive = true,
            };

            bool hasAddressData = !string.IsNullOrWhiteSpace(request.Address.Street) &&
                     !string.IsNullOrWhiteSpace(request.Address.City) &&
                     !string.IsNullOrWhiteSpace(request.Address.PostalCode) &&
                     !string.IsNullOrWhiteSpace(request.Address.Country);

            if (hasAddressData)
            {
                Address userAddress = new Address
                {
                    Street = request.Address.Street,
                    City = request.Address.City,
                    PostalCode = request.Address.PostalCode,
                    Country = request.Address.Country,
                    StateOrRegion = request.Address.StateOrRegion,
                    ApartmentNumber = request.Address.ApartmentNumber,
                    CreateDate = currentDate,
                };

                _context.Addresses.Add(userAddress);
                userToCreate.Address = userAddress;
                await _context.SaveChangesAsync(cancellationToken);
            }
            await _context.Users.AddAsync(userToCreate, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return Response.Success(userToCreate.Id);
        }
    }
}
