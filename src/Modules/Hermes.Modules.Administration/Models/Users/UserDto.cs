using Hermes.Domain.Entities;
using Hermes.Domain.Enums;
using Hermes.Modules.Users.Models.Address;

namespace Hermes.Application.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public Role Role { get; set; }
        //public string Role { get; set; } = string.Empty; 
        public bool IsActive { get; set; }
        public int? AddressId { get; set; }
        public AddressDto? Address { get; set; }

    }
}