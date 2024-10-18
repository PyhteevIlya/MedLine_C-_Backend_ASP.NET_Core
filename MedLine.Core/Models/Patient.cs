namespace MedLine.Core.Models
{
    public class Patient
    {
        public Patient(Guid id, string fullName, string? personalPhone, string? jobPhone, string tabelNumber, string orgUnit, string? jobRole, string? programMedicalPolicy)
        {
            Id = id;
            FullName = fullName;
            PersonalPhone = personalPhone;
            JobPhone = jobPhone;
            TabelNumber = tabelNumber;
            OrgUnit = orgUnit;
            JobRole = jobRole;
            ProgramMedicalPolicy = programMedicalPolicy;
        }

        public Guid Id { get; }
        /// <summary>
        /// ФИО
        /// </summary>
        public string FullName { get; }
        /// <summary>
        /// Персональный номер телефона +7.....
        /// </summary>
        public string? PersonalPhone { get; }
        /// <summary>
        /// Служебный телефон
        /// </summary>
        public string? JobPhone { get; }
        /// <summary>
        /// Табельный номер
        /// </summary>
        public string TabelNumber { get; }
        /// <summary>
        /// Штатная единица
        /// </summary>
        public string OrgUnit { get; }
        /// <summary>
        /// Должность
        /// </summary>
        public string? JobRole { get; }
        /// <summary>
        /// Полис
        /// </summary>
        public string? ProgramMedicalPolicy { get; }

    }
}
