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
            // Add other states here...
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
