using Hermes.Domain.Enums;

namespace Hermes.Application.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        //public Role Role { get; set; }
        public string Role { get; set; } = string.Empty; 
        public bool IsActive { get; set; }
        public int? AddressId { get; set; }
        public string? AddressStreet { get; set; }
        public string? AddressCity { get; set; }
        public string? AddressPostalCode { get; set; }
        public string? AddressCountry { get; set; }

    }
}