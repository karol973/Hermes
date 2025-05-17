namespace Hermes.Domain.Entities
{
    public class AntiqueShop : BaseEntity
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string Description { get; init; }
        public string? EmailAddress { get; init; }
        public string? PhoneNumber { get; init; }
        public bool IsActive { get; init; }
        public List<Book> Books { get; init; } = new List<Book>();
    }
}
