using Hermes.Domain.Entities;
using Hermes.Modules.Books.Models;
using System.Text.Json.Serialization;

namespace Hermes.Modules.Authors.Models
{
    public class AuthorDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        [JsonIgnore]  
        public ICollection<Book> Books { get; set; }
    }
}
