using MedLine.Core.Models;
using System.Security.Principal;

namespace MedLine.Application.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly IOrgStructureNovatorService _orgStructure;

        public UserService(IOrgStructureNovatorService orgStructure)
        {
            _orgStructure = orgStructure;
        }
        public async Task<User> GetUser(SecurityIdentifier sid)
        {
            var person = await _orgStructure.GetPersonBySid(sid);
            var user = person.CreateUser();
            user.Role = person.TakeUserRole();

            return user;
        }

        public async Task<User> GetUserForTerminal(string userId)
        {
            var person = await _orgStructure.GetPersonById(Guid.Parse(userId));
            var user = person.CreateUser();
            user.Role = person.TakeUserRole();
            return user;
        }

        public List<User> GetPersonsAutoComplete(string searchString)
        {
            var allPersons = _orgStructure.GetAllPersons().Result;
            var allUsers = allPersons.Select(p =>
                p.CreateUser());

            var users = allUsers.Where(u => u.FullName.ToLower().Contains(searchString.ToLower(), StringComparison.OrdinalIgnoreCase)).Take(10).ToList();
            return users;
        }

        public List<User> GetPersons89Department()
        {
            var allPersons = _orgStructure.GetAllPersons().Result;
            var persons = allPersons.Where(p => p.MainAppointment != null).ToList();
#if DEBUG
            var users = persons.Where(p => p.MainAppointment.StaffPosition.OrgUnit.Name.Contains("Отдел 89")
                                           || p.MainAppointment.StaffPosition.OrgUnit.Name.Contains("Отдел 16")
                                           || p.MainAppointment.StaffPosition.OrgUnit.ParentOrgUnit.Name.Contains("Отдел 89")
                                           || p.MainAppointment.StaffPosition.OrgUnit.ParentOrgUnit.Name.Contains("Отдел 16")).ToList();
#else

            var users = persons.Where(p => p.MainAppointment.StaffPosition.OrgUnit.Name.Contains("Отдел 89")
                                              || p.MainAppointment.StaffPosition.OrgUnit.ParentOrgUnit.Name.Contains(
                                                  "Отдел 89"));
#endif
            var parents89 = users.Select(p =>
                p.CreateUser()).ToList();

            return parents89;
        }
    }
}
