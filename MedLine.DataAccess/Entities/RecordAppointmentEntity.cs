using MedLine.Core.Models.Enum;

namespace MedLine.DataAccess.Entities
{
    public class RecordAppointmentEntity
    {
        public Guid Id { get; set; }
        public DateOnly DateAppointment { get; set; }
        public TimeOnly TimeAppointment { get; set; }
        public bool IsReserved { get; set; } = false;
        public string RoomNumber { get; set; }
        public Guid? PatientId { get; set; } = null;
        public Guid DoctorId { get; set; }
        public StatusRecordEnum Status { get; set; } = StatusRecordEnum.Создана;

        public DoctorEntity? Doctor { get; set; }
        public PatientEntity? Patient { get; set; }
    }
}
