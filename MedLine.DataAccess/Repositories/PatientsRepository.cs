using MedLine.Core.Abstractions;
using MedLine.Core.Models;
using MedLine.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace MedLine.DataAccess.Repositories
{
    public class PatientsRepository : IPatientsRepository
    {
        private readonly MedLineDbContext _context;

        public PatientsRepository(MedLineDbContext context)
        {
            _context = context;
        }

        public async Task<List<Patient>> Get()
        {
            var patientEntitys = await _context.Patients
                .AsNoTracking()
                .ToListAsync();
            var patients = patientEntitys
                .Select(b =>
                    new Patient
                        (b.Id, b.FullName, b.PersonalPhone, b.JobPhone, b.TabelNumber, b.OrgUnit, b.JobRole, b.ProgramMedicalPolicy))
                .ToList();
            return patients;
        }

        public async Task<Guid> Create(Patient patient)
        {
            var patientEntity = new PatientEntity()
            {
                Id = patient.Id,
                FullName = patient.FullName,
                PersonalPhone = patient.PersonalPhone,
                JobPhone = patient.JobPhone,
                TabelNumber = patient.TabelNumber,
                OrgUnit = patient.OrgUnit,
                JobRole = patient.JobRole,
                ProgramMedicalPolicy = patient.ProgramMedicalPolicy
            };
            await _context.AddAsync(patientEntity);
            await _context.SaveChangesAsync();

            return patientEntity.Id;
        }

        public async Task<Guid> Update(Guid id, string fullName, string? personalPhone, string? jobPhone, string tabelNumber,
            string orgUnit, string? jobRole, string? programMedicalPolicy)
        {
            await _context.Patients
                .Where(x => x.Id == id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(b => b.FullName, fullName)
                    .SetProperty(b => b.PersonalPhone, personalPhone)
                    .SetProperty(b => b.JobPhone, jobPhone)
                    .SetProperty(b => b.TabelNumber, tabelNumber)
                    .SetProperty(b => b.OrgUnit, orgUnit)
                    .SetProperty(b => b.JobRole, jobRole)
                    .SetProperty(b => b.ProgramMedicalPolicy, programMedicalPolicy));

            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.Patients
                .Where(x => x.Id == id)
                .ExecuteDeleteAsync();
            return id;
        }
    }
}
