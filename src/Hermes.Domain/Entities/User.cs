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
        public ICollection<Address> Addresses { get; init; } = new List<Address>();
    }
}
