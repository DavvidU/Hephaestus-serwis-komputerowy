using Hephaestus.Server.Data;
using Hephaestus.Server.Model;
using Hephaestus.Server.Validators;
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

/* Create */

app.MapPost("/failures", async (Failure failureToAdd, HephaestusDbContext hephaestusDbContext) =>
{
    // Validation
    if (!FailureVaildator.IsFailureVaild(failureToAdd)) 
        return Results.StatusCode(400);

    hephaestusDbContext.Add(failureToAdd);
    await hephaestusDbContext.SaveChangesAsync();
    return Results.Created($"/failures/{failureToAdd.Id}", failureToAdd);
}
);

/* Read */

app.MapGet("/failures", async (HephaestusDbContext hephaestusDbContext) =>
{
    return await hephaestusDbContext.Failures.ToListAsync();
}
);

app.MapGet("/failures/{id}", async (int id, HephaestusDbContext hephaestusDbContext) =>
{
    return await hephaestusDbContext.Failures.FindAsync(id);
});

/* Update */

app.MapPut("/faiilures/{id}", async (int id, Failure failureToPut, HephaestusDbContext hephaestusDbContext) =>
{
    // Validation
    if (!FailureVaildator.IsFailureVaild(failureToPut)) 
        return Results.StatusCode(400);

    Failure failure = await hephaestusDbContext.Failures.FindAsync(id);

    if (failure == null) return Results.NotFound();

    // FailureType, Name and Date not to edit!
    
    failure.PotentialPrice = failureToPut.PotentialPrice;
    failure.PotentialDate = failureToPut.PotentialDate;
    failure.Status = failureToPut.Status;
    failure.RepairDescription = failureToPut.RepairDescription;

    await hephaestusDbContext.SaveChangesAsync();

    return Results.NoContent();
});

/* Delete */

app.MapDelete("/failures/{id}", async (int id, HephaestusDbContext hephaestusDbContext) =>
{
    if (await hephaestusDbContext.Failures.FindAsync(id) is Failure failure)
    {
        hephaestusDbContext.Remove(failure);
        await hephaestusDbContext.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.MapFallbackToFile("/index.html");

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
