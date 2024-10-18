namespace MedLine.DataAccess.Entities
{
    public class DoctorEntity
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Specialization { get; set; }
        public string? Description { get; set; }

        public List<RecordAppointmentEntity> RecordAppointments { get; set; }
    }
}
