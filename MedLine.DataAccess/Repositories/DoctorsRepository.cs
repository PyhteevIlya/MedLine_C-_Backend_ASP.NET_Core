using MedLine.Core.Abstractions;
using MedLine.Core.Models;
using MedLine.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace MedLine.DataAccess.Repositories
{
    public class DoctorsRepository : IDoctorsRepository
    {
        private readonly MedLineDbContext _context;

        public DoctorsRepository(MedLineDbContext context)
        {
            _context = context;
        }

        public async Task<List<Doctor>> Get()
        {
            var doctorEntitys = await _context.Doctors
                .AsNoTracking()
                .ToListAsync();
            var doctors = doctorEntitys
                .Select(b =>
                    new Doctor
                        (b.Id, b.FullName, b.Specialization, b.Description))
                .ToList();

            return doctors;
        }

        public async Task<Guid> Create(Doctor doctor)
        {
            var doctorEnity = new DoctorEntity()
            {
                Id = doctor.Id,
                FullName = doctor.FullName,
                Specialization = doctor.Specialization,
                Description = doctor.Description,
            };
            await _context.Doctors.AddAsync(doctorEnity);
            await _context.SaveChangesAsync();

            return doctorEnity.Id;
        }

        public async Task<Guid> Update(Guid id, string fullName, string specialization, string description)
        {
            var doctorEntity = await _context.Doctors
                .Where(x => x.Id == id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(b => b.FullName, fullName)
                    .SetProperty(b => b.Specialization, specialization)
                    .SetProperty(b => b.Description, description));

            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.Doctors
                .Where(x => x.Id == id)
                .ExecuteDeleteAsync();
            return id;
        }
    }
}
