using MedLine.Core.Models.Enum;

namespace MedLine.API.Contracts
{
    public record RecordsWithFullNameResponse(
        Guid id,
        string dateAppointment,
        string timeAppointment,
        string roomNumber,
        bool isReserved,
        Guid? patientId,
        string? patientFullName,
        Guid doctorId,
        string doctorFullName,
        StatusRecordEnum status);
}
