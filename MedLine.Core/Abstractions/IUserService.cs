using MedLine.Core.Models;
using System.Security.Principal;

namespace MedLine.Application.Services
{
    public interface IUserService
    {
        Task<User> GetUser(SecurityIdentifier sid);
        Task<User> GetUserForTerminal(string userId);
        List<User> GetPersonsAutoComplete(string searchString);
        List<User> GetPersons89Department();
    }
}