using Hermes.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hermes.Modules.Books.Models
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int PublishYear { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public bool IsAvailable { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; } = string.Empty;  
        public int PublisherId { get; set; }
        public string PublisherName { get; set; } = string.Empty;  
        //public BookCategory Category { get; set; }
        public string Category { get; set; } = string.Empty ;
        public int AntiqueShopId { get; set; }
        public string AntiqueShopName { get; set; } = string.Empty;  
        public int OrderItemsCount { get; set; }
    }
}
