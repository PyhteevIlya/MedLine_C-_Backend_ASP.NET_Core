using MedLine.Core.Models;

namespace MedLine.Core.Abstractions
{
    public interface IPatientsRepository
    {
        Task<Guid> Create(Patient patient);
        Task<Guid> Delete(Guid id);
        Task<List<Patient>> Get();
        Task<Guid> Update(Guid id, string fullName, string? personalPhone, string? jobPhone, string tabelNumber, string orgUnit, string? jobRole, string? programMedicalPolicy);
    }
}