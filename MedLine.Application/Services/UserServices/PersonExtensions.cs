using MedLine.Core.Models;
using MedLine.Core.Models.Enum;
using OrgStructure.Model;

namespace MedLine.Application.Services.UserServices
{
    public static class PersonExtensions
    {
        public static User CreateUser(this Person person)
        {
            var user = new User(
                person.Id,
                person.GetFullName(),
                person.Phones.ToList(),
                person.TabelNumber,
                $"{person.MainAppointment.StaffPosition.OrgUnit.ParentOrgUnit.Name}, {person.MainAppointment.StaffPosition.OrgUnit.Name}",
                person.MainAppointment.StaffPosition.PostName);
            return user;
        }

        public static RoleEnum TakeUserRole(this Person person)
        {
            if (person.SecurityGroups.Contains("appGroup_MedLine_Developers"))
            {
                return RoleEnum.Разработчик;
            }
            else if (person.SecurityGroups.Contains("appGroup_MedLine_Administrators"))
            {
                return RoleEnum.Администратор;
            }
            else if (person.SecurityGroups.Contains("appGroup_MedLine_Doctors"))
            {
                return RoleEnum.Врач;
            }
            else
            {
                return RoleEnum.Пользователь;
            }
        }

    }
}
