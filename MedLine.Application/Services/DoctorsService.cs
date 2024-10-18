using MedLine.Core.Abstractions;
using MedLine.Core.Models;

namespace MedLine.Application.Services
{
    public class DoctorsService : IDoctorsService
    {
        private readonly IDoctorsRepository _doctorRepository;

        public DoctorsService(IDoctorsRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }
        public async Task<List<Doctor>> GetAllDoctor()
        {
            return await _doctorRepository.Get();
        }
        public async Task<Doctor> GetDoctorById(Guid id)
        {
            var doctorsList = await _doctorRepository.Get();
            var doctor = doctorsList.FirstOrDefault(d => d.Id == id);

            return doctor;
        }

        public async Task<Guid> CreatDoctor(Doctor doctor)
        {
            return await _doctorRepository.Create(doctor);
        }

        public async Task<Guid> UpdateDoctor(Guid id, string fullName, string specialization, string description)
        {
            return await _doctorRepository.Update(id, fullName, specialization, description);
        }

        public async Task<Guid> DeleteDoctor(Guid id)
        {
            return await _doctorRepository.Delete(id);
        }
    }
}
