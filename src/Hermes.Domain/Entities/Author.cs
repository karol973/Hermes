namespace Hermes.Domain.Entities
{
    public class Author : BaseEntity
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string Surname { get; init; }
        public ICollection<Book> Books { get; init; } = new List<Book>();
    }
}
