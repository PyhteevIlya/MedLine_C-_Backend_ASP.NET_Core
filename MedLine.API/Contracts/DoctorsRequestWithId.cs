namespace MedLine.API.Contracts
{
    public record DoctorsRequestWithId(
        Guid id,
        string fullName,
        string specialization,
        string? description);
}
