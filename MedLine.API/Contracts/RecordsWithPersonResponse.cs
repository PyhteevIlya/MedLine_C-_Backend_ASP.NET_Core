using MedLine.Core.Models.Enum;

namespace MedLine.API.Contracts
{
    public record RecordsWithPersonResponse(
        Guid id,
        DateOnly dateAppointment,
        TimeOnly timeAppointment,
        string roomNumber,
        bool isReserved,
        Guid? patientId,
        string? patientFullName,
        string? personalPhone,
        string? jobPhone,
        string? orgUnit,
        string tabelNumber,
        string jobRole,
        string? programMedicalPolicy,
        Guid doctorId,
        string doctorFullName,
        StatusRecordEnum status);
}
