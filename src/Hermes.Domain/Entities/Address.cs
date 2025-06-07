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
  
        public int Id { get; init; }
        public string Street { get; init; }     
        public string City { get; init; }      
        public string PostalCode { get; init; }        
        public string Country { get; init; }         
        public string? StateOrRegion { get; init; }    
        public string? ApartmentNumber { get; init; }
        public Address()
        {
            Street = string.Empty;
            City = string.Empty;
            PostalCode = string.Empty;
            Country = string.Empty;
        }
    }
}
