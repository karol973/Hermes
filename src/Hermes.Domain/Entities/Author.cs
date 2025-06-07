namespace Hermes.Domain.Entities
{
    public class Author : BaseEntity
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public string Surname { get; init; }
        public ICollection<Book> Books { get; init; } = new List<Book>();
        public Author()
        {
            Name = string.Empty;
            Surname = string.Empty;
        }
    }
}
