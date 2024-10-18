using MedLine.Core.Models;

namespace MedLine.Core.Abstractions
{
    public interface IDoctorsRepository
    {
        Task<Guid> Create(Doctor doctor);
        Task<Guid> Delete(Guid id);
        Task<List<Doctor>> Get();
        Task<Guid> Update(Guid id, string fullName, string specialization, string description);
    }
}