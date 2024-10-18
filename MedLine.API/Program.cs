using MedLine.API.JWTSettings;
using MedLine.API.Logger;
using MedLine.Application.Services;
using MedLine.Application.Services.UserServices;
using MedLine.Core.Abstractions;
using MedLine.DataAccess;
using MedLine.DataAccess.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Negotiate;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Filters;
using System.Text;
using System.Text.Json;

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.Configure<JWTSettings>(builder.Configuration.GetSection("JWTSettings"));

    var secretKey = builder.Configuration.GetSection("JWTSettings:SecretKey").Value;
    var issuer = builder.Configuration.GetSection("JWTSettings:Issuer").Value;
    var audience = builder.Configuration.GetSection("JWTSettings:Audience").Value;
    var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

    builder.Services.AddAuthentication(options =>
        {
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, option =>
        {
            option.Events = new JwtBearerEvents
            {
                OnChallenge = context =>
                {
                    context.HandleResponse();
                    context.Response.StatusCode = 403;
                    context.Response.ContentType = "application/json";
                    var result = JsonSerializer.Serialize(new { error = "Forbidden" });
                    return context.Response.WriteAsync(result);
                }
            };
            option.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = issuer,
                ValidateAudience = true,
                ValidAudience = audience,
                ValidateLifetime = true,
                IssuerSigningKey = signingKey,
                ValidateIssuerSigningKey = true,
            };

        })
        .AddNegotiate(NegotiateDefaults.AuthenticationScheme, option =>
        {
            option.Events = new NegotiateEvents()
            {
                OnChallenge = context =>
                {
                    context.HandleResponse();
                    context.Response.StatusCode = 401;
                    context.Response.ContentType = "application/json";
                    var result = JsonSerializer.Serialize(new { error = "Unauthorize" });
                    return context.Response.WriteAsync(result);
                }
            };
        });

    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("Пользователь", policy => policy.RequireRole("Пользователь", "Врач", "Администратор", "Разработчик"));
        options.AddPolicy("Врач", policy => policy.RequireRole("Врач", "Администратор", "Разработчик"));
        options.AddPolicy("Администратор", policy => policy.RequireRole("Администратор", "Разработчик"));
        options.AddPolicy("Разработчик", policy => policy.RequireRole("Разработчик"));
    });

    builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        var securitySchema = new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        };

        c.AddSecurityDefinition("Bearer", securitySchema);

        var securityRequirement = new OpenApiSecurityRequirement
        {
            { securitySchema, new[] { "Bearer" } }
        };

        c.AddSecurityRequirement(securityRequirement);
    });

    builder.Services.AddDbContext<MedLineDbContext>(
        options =>
        {
            var connectionString = builder.Configuration.GetConnectionString(nameof(MedLineDbContext));
            options.UseSqlServer(connectionString);
        });

    builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection(nameof(JwtOptions)));
    builder.Services.AddScoped<IOrgStructureNovatorService, OrgStructureNovatorService>();

    builder.Services.AddScoped<IRecordsAppointmentService, RecordsAppointmentService>();
    builder.Services.AddScoped<IRecordsAppointmentRepository, RecordsAppointmentRepository>();

    builder.Services.AddScoped<IDoctorsService, DoctorsService>();
    builder.Services.AddScoped<IDoctorsRepository, DoctorsRepository>();

    builder.Services.AddScoped<IPatientsService, PatientsService>();
    builder.Services.AddScoped<IPatientsRepository, PatientsRepository>();

    builder.Services.AddScoped<IBoardInfoRepository, BoardInfoRepository>();

    builder.Services.AddScoped<IUserService, UserService>();

    builder.Services.AddScoped<IJwtProvider, JwtProvider>();

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin", policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:5000", "https://localhost:44318",
                    "https://Medline.test.local", "http://Medline.test.local", "https://Medline.novator.ru",
                    "http://Medline.novator.ru")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
    });
    builder.Services.AddDirectoryBrowser();

    builder.Host.UseSerilog((ctx, lc) => lc
        .WriteTo.Console()
        .ReadFrom.Configuration(ctx.Configuration)
        .Filter.ByExcluding(Matching.WithProperty("RequestPath", new Func<string, bool>(scalar => scalar?.ToLower().Contains("healthcheck") == true))));

    var app = builder.Build();

    app.UseMiddleware<LoggingEnrichmentMiddleware>();
    app.UseSerilogRequestLogging();

    Serilog.Log.Logger.Information("Application starting up...");

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    else
    {
        app.UseExceptionHandler("/Main/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();

    app.UseDefaultFiles();
    app.UseStaticFiles();

    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.MapFallbackToFile("index.html");

    app.UseCors("AllowSpecificOrigin");

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.Information("Application start-up success");
    Log.CloseAndFlush();
}
