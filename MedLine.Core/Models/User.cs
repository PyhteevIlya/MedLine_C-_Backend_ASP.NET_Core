using MedLine.Core.Models.Enum;

namespace MedLine.Core.Models
{
    public class User
    {
        public User(Guid id, string fullName, List<string> personalPhone, string tabelNumber, string orgUnit, string jobRole)
        {
            Id = id;
            FullName = fullName;
            PersonalPhone = personalPhone;
            TabelNumber = tabelNumber;
            OrgUnit = orgUnit;
            JobRole = jobRole;
        }
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public List<string>? PersonalPhone { get; set; }
        public string TabelNumber { get; set; }
        public string OrgUnit { get; set; }
        public string? JobRole { get; set; }
        public RoleEnum Role { get; set; }
    }
}
