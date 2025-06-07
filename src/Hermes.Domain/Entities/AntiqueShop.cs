namespace Hermes.Domain.Entities
{
    public class AntiqueShop : BaseEntity
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public string Description { get; init; }
        public string? EmailAddress { get; init; }
        public string? PhoneNumber { get; init; }
        public bool IsActive { get; init; }
        public List<Book> Books { get; init; } = new List<Book>();
        public AntiqueShop()
        {
            Name = string.Empty;
            Description = string.Empty; 
        }
    }
}
