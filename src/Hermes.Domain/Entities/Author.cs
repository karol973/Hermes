namespace Hermes.Domain.Entities
{
    public class Author : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public ICollection<Book> Books { get; set; } = new List<Book>();
        public Author()
        {
            Name = string.Empty;
            Surname = string.Empty;
        }
    }
}
