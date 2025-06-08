using AutoMapper;
using Hermes.Application.DTOs;
using Hermes.Domain.Entities;
using Hermes.Modules.Users.Models.Address;
using Hermes.Shared.Enums;

namespace Hermes.Modules.Users.Mappings
{
    internal sealed class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom((src, dest) => src.Role.GetDescription()));

            CreateMap<Address, AddressDto>();

        }
    }
}
