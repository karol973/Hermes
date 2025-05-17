using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hermes.Domain.Entities
{
    public class Address : BaseEntity
    {
        public Guid Id { get; init; }

        [Required]
        public string Street { get; init; }     

        [Required]
        public string City { get; init; }      

        [Required]
        public string PostalCode { get; init; }        

        [Required]
        public string Country { get; init; }         

        public string? StateOrRegion { get; init; }    

        public string? ApartmentNumber { get; init; }  

        public Guid UserId { get; init; }           
        public User User { get; init; }
    }
}
