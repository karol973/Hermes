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
  
        public int Id { get; set; }
        public string Street { get; set; }     
        public string City { get; set; }      
        public string PostalCode { get; set; }        
        public string Country { get; set; }         
        public string? StateOrRegion { get; set; }    
        public string? ApartmentNumber { get; set; }
        public Address()
        {
            Street = string.Empty;
            City = string.Empty;
            PostalCode = string.Empty;
            Country = string.Empty;
        }
    }
}
