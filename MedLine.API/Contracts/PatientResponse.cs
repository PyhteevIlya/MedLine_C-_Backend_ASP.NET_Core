namespace MedLine.API.Contracts
{
    public record PatientResponse(
        Guid id, 
        string fullName, 
        string? personalPhone, 
        string? jobPhone, 
        string tabelNumber, 
        string orgUnit, 
        string? jobRole, 
        string? programMedicalPolicy);
}
