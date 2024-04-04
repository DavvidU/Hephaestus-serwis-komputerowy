using Hephaestus.Server.Data;
using Hephaestus.Server.Model;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Zarejestrowanie kontekstu bazy danych

builder.Services.AddDbContext<HephaestusDbContext>(options =>
                    options.UseSqlServer(builder.Configuration.GetConnectionString("HephaestusContext")));

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/add-failure", async (Failure failure, HephaestusDbContext hephaestusDbContext) =>
{
    hephaestusDbContext.Add(failure);
    await hephaestusDbContext.SaveChangesAsync();
    return Results.Created($"/failures/{failure.Id}", failure);
}
);

app.MapGet("/get-failures", async (HephaestusDbContext hephaestusDbContext) =>
{
    return await hephaestusDbContext.Failures.ToListAsync();
}
);

app.MapFallbackToFile("/index.html");

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
