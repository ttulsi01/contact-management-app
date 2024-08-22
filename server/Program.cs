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
            Email = "john.doe@example.com", 
            Street = "123 Main St", 
            City = "Springfield", 
            State = "IL", 
            Zip = "62704", 
            ContactFrequency = "OK to contact with marketing information", 
            PhoneNumber = "555-1234" 
        }
        // Add more seed data here...
    );
    context.SaveChanges();
}
