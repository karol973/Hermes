using Hermes.Domain.Enums;

namespace Hermes.Domain.Entities
{
    public class User  
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public Role Role { get; set; }
        public bool IsActive { get; set; }
        public int? AddressId { get; set; }  
        public Address? Address { get; set; } 
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
