using OrgStructure.Lite;
using OrgStructure.Model;
using System.Security.Principal;
using OrgStructure;

namespace MedLine.Application.Services
{
    public class OrgStructureNovatorService : IOrgStructureNovatorService
    {
        public static Person Person { get; set; }

        public async Task<Person> GetPersonBySid(SecurityIdentifier sid)
        {
            byte[] bytes = new byte[sid.BinaryLength];
                sid.GetBinaryForm(bytes, 0);
            Person = await new OrgStructureLiteApi(hostName: OrgStructureLiteApi.HostName.Production).GetPersonBySid(bytes, true);
            return Person;
        }

        public async Task<Person> GetPersonById(Guid id)
        {
            var person = await new OrgStructureLiteApi(hostName: OrgStructureLiteApi.HostName.Production).GetPersonById(id, true);
            return person;
        }

        public async Task<List<Person>> GetAllPersons()
        { 
            List<Person> persons = await new OrgStructureLiteApi(hostName:OrgStructureLiteApi.HostName.Production).GetPersons();
            return persons;
        }

        public async Task<List<Person>> GetAllPersonsWithAvatar()
        {
            OrgStructureApi.Start(x => x.ConnectToProductionServer()).Wait();
            var organization = OrgStructureApi.GetOrganization();
            var persons = organization.People.Where(p => p.HasAvatarCrop).ToList();
            return persons;
        }
    }
}
