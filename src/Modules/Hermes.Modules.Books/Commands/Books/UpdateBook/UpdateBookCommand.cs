using Hermes.Domain.Enums;
using Hermes.Modules.Shared.Response;
using MediatR;

namespace Hermes.Modules.Books.Commands.Books.UpdateBook
{
    public sealed class UpdateBookCommand : IRequest<Response>
    {
        public int Id { get; set; } 
        public string Name { get; set; } = string.Empty;
        public int PublishYear { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public bool IsAvailable { get; set; }
        public byte[]? BookImage { get; set; }
        public int AuthorId { get; set; }
        public int PublisherId { get; set; }
        public BookCategory Category { get; set; } = BookCategory.None;
        public int AntiqueShopId { get; set; } = 1;
    }
}
