using Hermes.Modules.Books.Models;

namespace Hermes.Modules.Authors.Models
{
    public class AuthorDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public List<BookDto> Books { get; set; } = new();
    }
}
