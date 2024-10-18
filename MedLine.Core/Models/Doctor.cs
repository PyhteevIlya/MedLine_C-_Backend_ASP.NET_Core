namespace MedLine.Core.Models
{
    public class Doctor
    {
        public Doctor(Guid id, string fullName, string specialization, string? description)
        {
            Id = id;
            FullName = fullName;
            Specialization = specialization;
            Description = description;
        }
        public Guid Id { get; }
        /// <summary>
        /// ФИО
        /// </summary>
        public string FullName { get; }
        /// <summary>
        /// Специальность
        /// </summary>
        public string Specialization { get; }
        /// <summary>
        /// Описание
        /// </summary>
        public string? Description { get; }
    }
}
