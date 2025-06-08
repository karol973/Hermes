using Hermes.Domain.Enums;

namespace Hermes.Domain.Entities
{
    public class User  
    {
        public int Id { get; init; }
        public string Username { get; init; }
        public string PasswordHash { get; init; }
        public Role Role { get; init; }
        public bool IsActive { get; init; }
        public int? AddressId { get; set; }  
        public Address? Address { get; set; } 
        public ICollection<Order> Orders { get; init; } = new List<Order>();
    }
}
