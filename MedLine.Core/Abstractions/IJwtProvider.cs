namespace MedLine.Application.Services
{
    public interface IJwtProvider
    {
        string GenerateToken(string userId);
    }
}