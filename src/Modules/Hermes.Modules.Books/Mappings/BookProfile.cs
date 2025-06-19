using AutoMapper;
using Hermes.Domain.Entities;
using Hermes.Modules.Books.Models;
using Hermes.Shared.Enums;


namespace Hermes.Modules.Books.Mappings
{
    internal sealed class BookProfile : Profile
    {
        public BookProfile()
        {
            CreateMap<Book, BookDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom((src, dest) => src.Category.GetDescription()))
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author != null ? src.Author.Name : ""))
                .ForMember(dest => dest.AuthorSurname, opt => opt.MapFrom(src => src.Author != null ? src.Author.Surname : ""))
                .ForMember(dest => dest.PublisherName, opt => opt.MapFrom(src => src.Publisher != null ? src.Publisher.Name : ""))
                .ForMember(dest => dest.AntiqueShopName, opt => opt.MapFrom(src => src.AntiqueShop != null ? src.AntiqueShop.Name : ""))
                .ForMember(dest => dest.OrderItemsCount, opt => opt.MapFrom(src => src.OrderItems != null ? src.OrderItems.Count : 0));

        }
    }
}
