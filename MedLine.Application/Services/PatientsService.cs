using MedLine.Core.Abstractions;
using MedLine.Core.Models;

namespace MedLine.Application.Services
{
    public class PatientsService : IPatientsService
    {
        private readonly IPatientsRepository _patientRepository;

        public PatientsService(IPatientsRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }
        public async Task<List<Patient>> GetAllPatient()
        {
            return await _patientRepository.Get();
        }

        public async Task<Patient> GetPatientById(Guid id)
        {
            var patients = await _patientRepository.Get();
            var patient = patients.FirstOrDefault(p => p.Id == id);
            return patient;
        }

        public async Task<Guid> CreatePatient(Patient patient)
        {
            return await _patientRepository.Create(patient);
        }
        public async Task<Guid> UpdatePatient(Guid id, string fullName, string? personalPhone, string? jobPhone, string tabelNumber,
            string orgUnit, string? jobRole, string? programMedicalPolicy)
        {
            return await _patientRepository.Update(id, fullName, personalPhone, jobPhone, tabelNumber, orgUnit, jobRole, programMedicalPolicy);
        }
        public async Task<Guid> DeletePatient(Guid id)
        {
            return await _patientRepository.Delete(id);
        }
    }
}
