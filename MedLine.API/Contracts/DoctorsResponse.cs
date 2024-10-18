namespace MedLine.API.Contracts
{
    public record DoctorsResponse(
        Guid id, 
        string fullName, 
        string specialization, 
        string description);
}
