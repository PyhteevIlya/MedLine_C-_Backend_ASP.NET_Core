using MedLine.Core.Models;

namespace MedLine.Application.Services
{
    public interface IPatientsService
    {
        Task<Guid> CreatePatient(Patient patient);
        Task<Guid> DeletePatient(Guid id);
        Task<List<Patient>> GetAllPatient();
        Task<Patient> GetPatientById(Guid id);
        Task<Guid> UpdatePatient(Guid id, string fullName, string? personalPhone, string? jobPhone, string tabelNumber, string orgUnit, string? jobRole, string? programMedicalPolicy);
    }
}