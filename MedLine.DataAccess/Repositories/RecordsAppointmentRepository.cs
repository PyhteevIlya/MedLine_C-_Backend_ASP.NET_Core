using MedLine.Core.Abstractions;
using MedLine.Core.Models;
using MedLine.Core.Models.Enum;
using MedLine.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace MedLine.DataAccess.Repositories
{
    public class RecordsAppointmentRepository : IRecordsAppointmentRepository
    {
        private readonly MedLineDbContext _context;

        public RecordsAppointmentRepository(MedLineDbContext context)
        {
            _context = context;
        }

        public async Task<List<RecordAppointment>> Get()
        {
            var recordAppoinmentEntities = await _context.RecordAppointments
                .AsNoTracking()
                .ToListAsync();
            var recordAppoinments = recordAppoinmentEntities
                .Select(b =>
                    new RecordAppointment
                        (b.Id, b.DateAppointment, b.TimeAppointment, b.RoomNumber, b.IsReserved, b.PatientId, b.DoctorId, b.Status))
                .ToList();

            return recordAppoinments;
        }

        public async Task<Guid> Create(RecordAppointment recordAppoinment)
        {
            var recordAppoinmentEntity = new RecordAppointmentEntity()
            {
                Id = recordAppoinment.Id,
                DateAppointment = recordAppoinment.DateAppointment,
                TimeAppointment = recordAppoinment.TimeAppointment,
                RoomNumber = recordAppoinment.RoomNumber,
                IsReserved = recordAppoinment.IsReserved,
                PatientId = recordAppoinment.PatientId,
                DoctorId = recordAppoinment.DoctorId,
                Status = recordAppoinment.Status,
            };

            await _context.AddAsync(recordAppoinmentEntity);
            await _context.SaveChangesAsync();

            return recordAppoinmentEntity.Id;
        }

        public async Task<Guid> Update(Guid id, DateOnly dateAppointment, TimeOnly timeAppointment, 
            string roomNumber, bool isReserved, Guid? patientId, Guid doctorId, StatusRecordEnum status)
        {
            await _context.RecordAppointments
                .Where(b => b.Id == id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(b => b.DateAppointment, b => dateAppointment)
                    .SetProperty(b => b.TimeAppointment, b => timeAppointment)
                    .SetProperty(b => b.RoomNumber, b => roomNumber)
                    .SetProperty(b => b.IsReserved, b => isReserved)
                    .SetProperty(b => b.PatientId, b => patientId)
                    .SetProperty(b => b.DoctorId, b => doctorId)
                    .SetProperty(b => b.Status, b => status));

            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.RecordAppointments
                .Where(b => b.Id == id)
                .ExecuteDeleteAsync();

            return id;
        }
    }
}
