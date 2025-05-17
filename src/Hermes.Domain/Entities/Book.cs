using Hermes.Domain.Enums;

namespace Hermes.Domain.Entities
{
    public class Book : BaseEntity
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public int PublishYear { get; init; }
        public decimal Price { get; init; }
        public int Quantity { get; init; }
        public bool IsAvailable { get; init; }

        public Guid AuthorId { get; init; }
        public Author Author { get; init; }

        public Guid PublisherId { get; init; }
        public Publisher Publisher { get; init; }
        public BookCategory Category { get; init; }

        public ICollection<OrderItem> OrderItems { get; init; } = new List<OrderItem>();
    }
}
