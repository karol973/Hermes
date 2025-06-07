using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hermes.Domain.Entities
{
    public class Publisher : BaseEntity
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public ICollection<Book> Books { get; init; } = new List<Book>();

    }
}
