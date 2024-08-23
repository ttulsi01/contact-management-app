// server/Modals/Contact.cs

using System.ComponentModel.DataAnnotations;

namespace ContactManagerApi.Models
{   
    // Define a Contact model class to represent contact information
    public class Contact
    {
        public int Id {get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Zip { get; set; } = string.Empty;
        public string ContactFrequency { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
