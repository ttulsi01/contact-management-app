// server/Program.cs
using ContactManagerApi.Data;
using ContactManagerApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddDbContext<ContactContext>(options => options.UseInMemoryDatabase("ContactList"));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Apply CORS policy
app.UseCors("AllowAllOrigins");

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Seed the database with initial data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ContactContext>();
    context.Database.EnsureCreated();
    SeedData(context);
}

// app.UseHttpsRedirection(); // Ensures all HTTP requests are redirected to HTTPS

app.UseAuthorization();

app.MapControllers();

app.Run();

void SeedData(ContactContext context)
{
    context.Contacts.AddRange(
        new Contact
        {
            Id = 1,
            FirstName = "John",
            LastName = "Doe",
            Email = "john.doe@gmail.com",
            Street = "123 Main St",
            City = "Springfield",
            State = "IL",
            Zip = "62704",
            ContactFrequency = "OK to contact with marketing information",
            PhoneNumber = "(217) 326-4598"
        },
        new Contact
        {
            Id = 2,
            FirstName = "Jane",
            LastName = "Smith",
            Email = "jane.smith@yahoo.com",
            Street = "456 Elm St",
            City = "Chicago",
            State = "IL",
            Zip = "60616",
            ContactFrequency = "OK to contact with third-party marketing information",
            PhoneNumber = "(312) 982-3412"
        },
        new Contact
        {
            Id = 3,
            FirstName = "Robert",
            LastName = "Johnson",
            Email = "robert.johnson@outlook.com",
            Street = "789 Oak St",
            City = "Houston",
            State = "TX",
            Zip = "77002",
            ContactFrequency = "Contact only about account information",
            PhoneNumber = "(713) 524-7689"
        },
        new Contact
        {
            Id = 4,
            FirstName = "Emily",
            LastName = "Davis",
            Email = "emily.davis@gmail.com",
            Street = "321 Pine St",
            City = "Phoenix",
            State = "AZ",
            Zip = "85001",
            ContactFrequency = "OK to contact with marketing information",
            PhoneNumber = "(602) 234-8765"
        },
        new Contact
        {
            Id = 5,
            FirstName = "Michael",
            LastName = "Brown",
            Email = "michael.brown@yahoo.com",
            Street = "654 Cedar St",
            City = "Los Angeles",
            State = "CA",
            Zip = "90001",
            ContactFrequency = "OK to contact with third-party marketing information",
            PhoneNumber = "(213) 753-4829"
        },
        new Contact
        {
            Id = 6,
            FirstName = "Sarah",
            LastName = "Miller",
            Email = "sarah.miller@outlook.com",
            Street = "987 Maple St",
            City = "Denver",
            State = "CO",
            Zip = "80202",
            ContactFrequency = "Contact only about account information",
            PhoneNumber = "(720) 654-2198"
        },
        new Contact
        {
            Id = 7,
            FirstName = "David",
            LastName = "Wilson",
            Email = "david.wilson@gmail.com",
            Street = "159 Birch St",
            City = "Miami",
            State = "FL",
            Zip = "33101",
            ContactFrequency = "OK to contact with marketing information",
            PhoneNumber = "(305) 789-5632"
        },
        new Contact
        {
            Id = 8,
            FirstName = "Laura",
            LastName = "Martinez",
            Email = "laura.martinez@yahoo.com",
            Street = "753 Spruce St",
            City = "Seattle",
            State = "WA",
            Zip = "98101",
            ContactFrequency = "OK to contact with third-party marketing information",
            PhoneNumber = "(206) 467-3891"
        },
        new Contact
        {
            Id = 9,
            FirstName = "James",
            LastName = "Anderson",
            Email = "james.anderson@outlook.com",
            Street = "951 Walnut St",
            City = "Boston",
            State = "MA",
            Zip = "02108",
            ContactFrequency = "Contact only about account information",
            PhoneNumber = "(617) 429-3758"
        },
        new Contact
        {
            Id = 10,
            FirstName = "Linda",
            LastName = "Taylor",
            Email = "linda.taylor@gmail.com",
            Street = "258 Chestnut St",
            City = "Nashville",
            State = "TN",
            Zip = "37201",
            ContactFrequency = "OK to contact with marketing information",
            PhoneNumber = "(615) 783-4512"
        }
    );
    context.SaveChanges();
}
