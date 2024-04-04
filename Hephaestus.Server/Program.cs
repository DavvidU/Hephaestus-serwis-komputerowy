using Hephaestus.Server.Data;
using Hephaestus.Server.Model;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<HephaestusDbContext>(options =>
                    options.UseSqlServer(builder.Configuration.GetConnectionString("HephaestusContext")));

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("https://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("AllowSpecificOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("add-failure", async (Failure failure, HephaestusDbContext hephaestusDbContext) =>
{
    hephaestusDbContext.Add(failure);
    await hephaestusDbContext.SaveChangesAsync();
    return Results.Created($"/failures/{failure.Id}", failure);
}
);

app.MapGet("get-failures", async (HephaestusDbContext hephaestusDbContext) =>
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
