using AutoMapper;
using Hermes.Application.DTOs;
using Hermes.Domain.Entities;
using Hermes.Modules.Users.Models.Address;
using Hermes.Modules.Shared;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hermes.Modules.Administration.Mappings
{
    internal sealed class UserProfile : Profile
    {
        public UserProfile()
        {
            //CreateMap<User, UserDto>()
            //    .ForMember(dest => dest.Role, opt => opt.MapFrom((src, dest) => src.Role.GetDescription()));

            CreateMap<Address, AddressDto>();

        }
    }
}
