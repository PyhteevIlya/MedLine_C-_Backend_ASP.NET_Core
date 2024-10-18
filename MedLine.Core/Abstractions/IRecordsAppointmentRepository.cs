using MedLine.Core.Models;
using MedLine.Core.Models.Enum;

namespace MedLine.Core.Abstractions;

public interface IRecordsAppointmentRepository
{
    Task<List<RecordAppointment>> Get();
    Task<Guid> Create(RecordAppointment recordAppoinment);

    Task<Guid> Update(Guid id, DateOnly dateAppoinment, TimeOnly timeAppoinment, 
        string roomNumber, bool isReserved, Guid? patientId, Guid doctorId, StatusRecordEnum status);

    Task<Guid> Delete(Guid id);
}