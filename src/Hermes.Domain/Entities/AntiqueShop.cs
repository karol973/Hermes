namespace Hermes.Domain.Entities
{
    public class AntiqueShop : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? EmailAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public List<Book> Books { get; set; } = new List<Book>();
        public AntiqueShop()
        {
            Name = string.Empty;
            Description = string.Empty; 
        }
    }
}
