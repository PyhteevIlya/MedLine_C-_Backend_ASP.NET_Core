namespace MedLine.API.Contracts
{
    public record DoctorsRequest(
        string fullName, 
        string specialization, 
        string? description);
}
