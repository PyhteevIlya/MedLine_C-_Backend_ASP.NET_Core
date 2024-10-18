using MedLine.Application.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedLine.API.Controllers
{
    [Authorize(Policy = "Пользователь")]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IDoctorsService _doctorService;
        private readonly IUserService _userService;

        public UserController(IDoctorsService doctorService, IUserService userService)
        {
            _doctorService = doctorService;
            _userService = userService;
        }

        [HttpGet(nameof(GetPersonsAutoComplete))]
        public IActionResult GetPersonsAutoComplete(string searchString)
        {
            var persons = _userService.GetPersonsAutoComplete(searchString);
            return Ok(persons);
        }

        [HttpGet(nameof(Get89Department))]
        public IActionResult Get89Department()
        {
            var doctors = _doctorService.GetAllDoctor().Result;
            var persons = _userService.GetPersons89Department();

            var response = persons.Where(p => doctors.All(d => d.Id != p.Id));


            return Ok(response);
        }
    }
}
