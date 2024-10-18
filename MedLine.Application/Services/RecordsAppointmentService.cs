using MedLine.Core.Abstractions;
using MedLine.Core.Models;
using MedLine.Core.Models.Enum;

namespace MedLine.Application.Services
{
    public class RecordsAppointmentService : IRecordsAppointmentService
    {
        private readonly IRecordsAppointmentRepository _recordsAppointmentRepository;

        public RecordsAppointmentService(IRecordsAppointmentRepository recordsAppointmentRepository)
        {
            _recordsAppointmentRepository = recordsAppointmentRepository;
        }
        public async Task<List<RecordAppointment>> GetAllRecords()
        {
            var recordsDb = await _recordsAppointmentRepository.Get();

            var records = recordsDb.Where(r => r.DateAppointment >= DateOnly.FromDateTime(DateTime.Today));
            var sortedRecords = records.OrderBy(record => record.DateAppointment)
                .ThenBy(record => record.TimeAppointment).ToList();

            return sortedRecords;
        }

        public async Task<RecordAppointment> GetRecordById(Guid id)
        {
            var records = await _recordsAppointmentRepository.Get();
            var recordsById = records.FirstOrDefault(r => r.Id == id);
            return recordsById;
        }

        public async Task<List<RecordAppointment>> GetRecordsByDoctorId(Guid doctorId)
        {
            var records = await _recordsAppointmentRepository.Get();
            var recordByDoctorId = records.Where(r => r.DoctorId == doctorId);

            var recordsFuture = recordByDoctorId.Where(r => r.DateAppointment >= DateOnly.FromDateTime(DateTime.Today));
            var sortedRecords = recordsFuture.OrderBy(record => record.DateAppointment)
                .ThenBy(record => record.TimeAppointment).ToList();

            return sortedRecords;
        }
        public async Task<List<RecordAppointment>> GetFreeRecordsByDoctorId(Guid doctorId)
        {
            var records = await _recordsAppointmentRepository.Get();
            var freeRecordsByDoctorId = records.Where(r => r.DoctorId == doctorId && r.IsReserved == false).ToList();

            var recordsFuture = freeRecordsByDoctorId.Where(r => r.DateAppointment >= DateOnly.FromDateTime(DateTime.Today));
            var sortedRecords = recordsFuture.OrderBy(record => record.DateAppointment)
                .ThenBy(record => record.TimeAppointment).ToList();

            return sortedRecords;
        }

        public async Task<List<RecordAppointment>> GetRecordsByPatientId(Guid? patientId)
        {
            if (patientId == null) return null;
            var records = await _recordsAppointmentRepository.Get();
            var recordByPatientId = records.Where(r => r.PatientId == patientId).ToList();

            var recordsFuture = recordByPatientId.Where(r => r.DateAppointment >= DateOnly.FromDateTime(DateTime.Today));
            var sortedRecords = recordsFuture.OrderBy(record => record.DateAppointment)
                .ThenBy(record => record.TimeAppointment).ToList();

            return sortedRecords;
        }

        public async Task<Guid> CreatRecord(RecordAppointment recordAppoinment)
        {
            return await _recordsAppointmentRepository.Create(recordAppoinment);
        }

        public async Task<Guid> UpdateRecord(Guid id, DateOnly dateAppointment, TimeOnly timeAppointment, 
            string roomNumber, bool isReserved, Guid? patientId, Guid doctorId, StatusRecordEnum status)
        {
            return await _recordsAppointmentRepository.Update(id, dateAppointment, timeAppointment, roomNumber, 
                isReserved, patientId, doctorId, status);
        }

        public async Task<Guid> DeleteRecord(Guid id)
        {
            return await _recordsAppointmentRepository.Delete(id);
        }
    }
}
