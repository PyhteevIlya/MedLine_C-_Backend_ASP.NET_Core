namespace MedLine.API.Contracts
{
    public record RecordsCreateModelRequest(
        DateOnly[] dateAppointment,
        TimeOnly[] timeAppointment,
        string roomNumber,
        bool isReserved,
        Guid doctorId);
}
