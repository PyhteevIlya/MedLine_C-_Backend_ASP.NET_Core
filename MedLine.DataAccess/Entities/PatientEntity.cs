namespace MedLine.DataAccess.Entities
{
    public class PatientEntity
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string? PersonalPhone { get; set; }
        public string? JobPhone { get; set; }
        public string TabelNumber { get; set; }
        public string OrgUnit { get; set; }
        public string? JobRole { get; set; }
        public string? ProgramMedicalPolicy { get; set; }

        public List<RecordAppointmentEntity> RecordAppointments { get; set; }
    }
}
