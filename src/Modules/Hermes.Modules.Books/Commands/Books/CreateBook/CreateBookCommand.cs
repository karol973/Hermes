using Hermes.Domain.Enums;
using Hermes.Modules.Shared.Response;
using MediatR;

namespace Hermes.Modules.Books.Commands.Books.CreateBook
{
    public class CreateBookCommand : IRequest<Response>
    {
        public string Name { get; set; } = string.Empty;
        public int PublishYear { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public bool IsAvailable { get; set; }
        public byte[]? BookImage { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public string AuthorSurname { get; set; } = string.Empty;
        public int PublisherId { get; set; }
        public BookCategory Category { get; set; } = BookCategory.None;
        public int AntiqueShopId { get; set; } = 1;
    }
}
