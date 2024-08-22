using Microsoft.AspNetCore.Mvc;
using ContactManagerApi.Models;
using ContactManagerApi.Data;
using Microsoft.EntityFrameworkCore;

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
}
