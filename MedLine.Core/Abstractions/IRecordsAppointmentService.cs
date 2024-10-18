using MedLine.Core.Models;
using MedLine.Core.Models.Enum;

namespace MedLine.Core.Abstractions;

public interface IRecordsAppointmentService
{
    Task<List<RecordAppointment>> GetAllRecords();
    Task<RecordAppointment> GetRecordById(Guid id);
    Task<List<RecordAppointment>> GetRecordsByDoctorId(Guid doctorId);
    Task<List<RecordAppointment>> GetFreeRecordsByDoctorId(Guid doctorId);
    Task<List<RecordAppointment>> GetRecordsByPatientId(Guid? patientId);
    Task<Guid> CreatRecord(RecordAppointment recordAppoinment);

    Task<Guid> UpdateRecord(Guid id, DateOnly dateAppoinment, TimeOnly timeAppoinment, string roomNumber, 
        bool isReserved, Guid? patientId, Guid doctorId, StatusRecordEnum status);

    Task<Guid> DeleteRecord(Guid id);
}