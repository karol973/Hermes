using AutoMapper;
using Hermes.Application.DTOs;
using Hermes.Domain.Entities;
using Hermes.Shared.Enums;

namespace Hermes.Modules.Users.Mappings
{
    internal sealed class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom((src, dest) => src.Role.GetDescription()))
                .ForMember(dest => dest.AddressStreet, opt => opt.MapFrom(src => src.Address != null ? src.Address.Street : null))
                .ForMember(dest => dest.AddressCity, opt => opt.MapFrom(src => src.Address != null ? src.Address.City : null))
                .ForMember(dest => dest.AddressPostalCode, opt => opt.MapFrom(src => src.Address != null ? src.Address.PostalCode : null))
                .ForMember(dest => dest.AddressCountry, opt => opt.MapFrom(src => src.Address != null ? src.Address.Country : null));
        }
    }
}
