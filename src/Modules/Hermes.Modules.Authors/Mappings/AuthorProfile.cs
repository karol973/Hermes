using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Authors.Models;

namespace Hermes.Modules.Authors.Mappings
{
    internal sealed class AuthorProfile : Profile
    {
        public AuthorProfile()
        {
            CreateMap<Author, AuthorDto>();
                //.ForMember(dest => dest.Books, opt => opt.MapFrom(src => src.Books));

        }
    }
}
