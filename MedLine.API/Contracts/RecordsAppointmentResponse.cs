using MedLine.Core.Models.Enum;

namespace MedLine.API.Contracts
{
    public record RecordsAppointmentResponse(
        Guid id,
        string dateAppointment,
        string timeAppointment,
        string roomNumber,
        bool isReserved,
        Guid? patientId,
        Guid doctorId,
        StatusRecordEnum status);

}
