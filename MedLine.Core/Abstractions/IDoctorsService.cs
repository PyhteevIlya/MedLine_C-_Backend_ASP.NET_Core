using MedLine.Core.Models;

namespace MedLine.Application.Services
{
    public interface IDoctorsService
    {
        Task<Guid> CreatDoctor(Doctor doctor);
        Task<Guid> DeleteDoctor(Guid id);
        Task<List<Doctor>> GetAllDoctor();
        Task<Doctor> GetDoctorById(Guid id);
        Task<Guid> UpdateDoctor(Guid id, string fullName, string specialization, string description);
    }
}