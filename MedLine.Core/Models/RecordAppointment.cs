using MedLine.Core.Models.Enum;

namespace MedLine.Core.Models
{
    public class RecordAppointment
    {
        public RecordAppointment(Guid id, DateOnly dateAppoinment, TimeOnly timeAppointment, 
            string roomNumber, bool isReserved, Guid? patientId, Guid doctorId, StatusRecordEnum status)
        {
            Id = id;
            DateAppointment = dateAppoinment;
            TimeAppointment = timeAppointment;
            RoomNumber = roomNumber;
            IsReserved = isReserved;
            PatientId = patientId;
            DoctorId = doctorId;
            Status = status;
        }
        public Guid Id { get; }
        /// <summary>
        /// Дата приема
        /// </summary>
        public DateOnly DateAppointment { get; }
        /// <summary>
        /// Время приема
        /// </summary>
        public TimeOnly TimeAppointment { get; }
        /// <summary>
        /// Номер кабинета
        /// </summary>
        public string RoomNumber { get; }
        /// <summary>
        /// Свободный или забронированный
        /// </summary>
        public bool IsReserved { get; } = false;
        /// <summary>
        /// Id пациента
        /// </summary>
        public Guid? PatientId { get; } = null;
        /// <summary>
        /// Id врача
        /// </summary>
        public Guid DoctorId { get; }
        /// <summary>
        /// Статус заявки
        /// </summary>
        public StatusRecordEnum Status { get; } = StatusRecordEnum.Создана;
    }
}
