using Hermes.Domain.Enums;

namespace Hermes.Domain.Entities
{
    public class User : BaseEntity
    {
        public Guid Id { get; init; }
        public string Username { get; init; }
        public string PasswordHash { get; init; }
        public Role Role { get; init; }
        public bool IsActive { get; init; }
        public Guid AddressId { get; init; }
        public Address Address { get; init; }
        public ICollection<Order> Orders { get; init; } = new List<Order>();
    }
}
