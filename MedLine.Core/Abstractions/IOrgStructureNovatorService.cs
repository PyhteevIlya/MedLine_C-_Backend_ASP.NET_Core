using OrgStructure.Model;
using System.Security.Principal;

namespace MedLine.Application.Services
{
    public interface IOrgStructureNovatorService
    {
        Task<Person> GetPersonBySid(SecurityIdentifier sid);
        Task<Person> GetPersonById(Guid id);
        Task<List<Person>> GetAllPersons();
        Task<List<Person>> GetAllPersonsWithAvatar();
    }
}