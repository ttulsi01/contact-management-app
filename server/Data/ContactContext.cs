// server/Data/ContactContext.cs

using Microsoft.EntityFrameworkCore;
using ContactManagerApi.Models;

namespace ContactManagerApi.Data
{   
    // This class defines a context for the Contact Manager API, inheriting from DbContext
    // DbContext is a part of Entity Framework Core and is responsible for managing database connections and operations
    public class ContactContext : DbContext
    {   
        // Constructor that accepts DbContextOptions for configuring the context
        // These options include database provider, connection string, etc.
        public ContactContext(DbContextOptions<ContactContext> options) : base(options) { }

        // DbSet property to represent the Contacts table in the database
        // DbSet is a collection of entities that can be queried from the database and saved back
        public DbSet<Contact> Contacts { get; set; }
    }
}
