using Hermes.Domain.Enums;

namespace Hermes.Domain.Entities
{
    public class Book : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PublishYear { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public bool IsAvailable { get; set; }
        public int AuthorId { get; set; }
        public byte[] BookImage { get; set; }
        public Author Author { get; set; }
        public int PublisherId { get; set; }
        public Publisher Publisher { get; set; }
        public BookCategory Category { get; set; }
        public int AntiqueShopId { get; set; }           
        public AntiqueShop AntiqueShop { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public Book()
        {
            Name = string.Empty;

        }
    }
}
