using Microsoft.AspNetCore.Mvc;
using ContactManagerApi.Models;
using ContactManagerApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class ContactsController : ControllerBase
{
    private readonly ContactContext _context;

    public ContactsController(ContactContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Contact>> GetContacts()
    {
        return _context.Contacts.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Contact> GetContact(int id)
    {
        var contact = _context.Contacts.Find(id);
        if (contact == null)
        {
            return NotFound();
        }
        return contact;
    }

    [HttpPost]
    public ActionResult<Contact> PostContact(Contact contact)
    {
        _context.Contacts.Add(contact);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
    }

    [HttpPut("{id}")]
    public IActionResult PutContact(int id, Contact contact)
    {
        if (id != contact.Id)
        {
            return BadRequest();
        }

        _context.Entry(contact).State = EntityState.Modified;
        _context.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteContact(int id)
    {
        var contact = _context.Contacts.Find(id);
        if (contact == null)
        {
            return NotFound();
        }

        _context.Contacts.Remove(contact);
        _context.SaveChanges();

        return NoContent();
    }

    // New endpoint to get dropdown options for states and contact frequency
    [HttpGet("dropdown-options")]
    public IActionResult GetDropdownOptions()
    {
        var states = new List<KeyValuePair<string, string>>
        {
            new KeyValuePair<string, string>("AL", "Alabama"),
            new KeyValuePair<string, string>("AK", "Alaska"),
            new KeyValuePair<string, string>("AZ", "Arizona"),
            new KeyValuePair<string, string>("AR", "Arkansas"),
            new KeyValuePair<string, string>("CA", "California"),
            new KeyValuePair<string, string>("CO", "Colorado"),
            new KeyValuePair<string, string>("CT", "Connecticut"),
            new KeyValuePair<string, string>("DE", "Delaware"),
            new KeyValuePair<string, string>("DC", "District of Columbia"),
            new KeyValuePair<string, string>("FL", "Florida"),
            new KeyValuePair<string, string>("GA", "Georgia"),
            new KeyValuePair<string, string>("HI", "Hawaii"),
            new KeyValuePair<string, string>("ID", "Idaho"),
            new KeyValuePair<string, string>("IL", "Illinois"),
            new KeyValuePair<string, string>("IN", "Indiana"),
            new KeyValuePair<string, string>("IA", "Iowa"),
            new KeyValuePair<string, string>("KS", "Kansas"),
            new KeyValuePair<string, string>("KY", "Kentucky"),
            new KeyValuePair<string, string>("LA", "Louisiana"),
            new KeyValuePair<string, string>("ME", "Maine"),
            new KeyValuePair<string, string>("MD", "Maryland"),
            new KeyValuePair<string, string>("MA", "Massachusetts"),
            new KeyValuePair<string, string>("MI", "Michigan"),
            new KeyValuePair<string, string>("MN", "Minnesota"),
            new KeyValuePair<string, string>("MS", "Mississippi"),
            new KeyValuePair<string, string>("MO", "Missouri"),
            new KeyValuePair<string, string>("MT", "Montana"),
            new KeyValuePair<string, string>("NE", "Nebraska"),
            new KeyValuePair<string, string>("NV", "Nevada"),
            new KeyValuePair<string, string>("NH", "New Hampshire"),
            new KeyValuePair<string, string>("NJ", "New Jersey"),
            new KeyValuePair<string, string>("NM", "New Mexico"),
            new KeyValuePair<string, string>("NY", "New York"),
            new KeyValuePair<string, string>("NC", "North Carolina"),
            new KeyValuePair<string, string>("ND", "North Dakota"),
            new KeyValuePair<string, string>("OH", "Ohio"),
            new KeyValuePair<string, string>("OK", "Oklahoma"),
            new KeyValuePair<string, string>("OR", "Oregon"),
            new KeyValuePair<string, string>("PA", "Pennsylvania"),
            new KeyValuePair<string, string>("RI", "Rhode Island"),
            new KeyValuePair<string, string>("SC", "South Carolina"),
            new KeyValuePair<string, string>("SD", "South Dakota"),
            new KeyValuePair<string, string>("TN", "Tennessee"),
            new KeyValuePair<string, string>("TX", "Texas"),
            new KeyValuePair<string, string>("UT", "Utah"),
            new KeyValuePair<string, string>("VT", "Vermont"),
            new KeyValuePair<string, string>("VA", "Virginia"),
            new KeyValuePair<string, string>("WA", "Washington"),
            new KeyValuePair<string, string>("WV", "West Virginia"),
            new KeyValuePair<string, string>("WI", "Wisconsin"),
            new KeyValuePair<string, string>("WY", "Wyoming")
        };


        var contactFrequencies = new List<KeyValuePair<string, string>>
        {
            new KeyValuePair<string, string>("AccountInfo", "Contact only about account information"),
            new KeyValuePair<string, string>("MarketingInfo", "OK to contact with marketing information"),
            new KeyValuePair<string, string>("ThirdPartyMarketingInfo", "OK to contact with third-party marketing information")
        };

        return Ok(new
        {
            States = states,
            ContactFrequencies = contactFrequencies
        });
    }
}
