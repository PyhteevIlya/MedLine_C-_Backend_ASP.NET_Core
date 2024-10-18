using MedLine.Core.Models.Enum;

namespace MedLine.API.Contracts
{
    public record RecordsAppointmentRequest(
       DateOnly dateAppointment,
       TimeOnly timeAppointment, 
       string roomNumber,
       bool isReserved, 
       Guid? patientId, 
       Guid doctorId, 
       StatusRecordEnum status);
}
