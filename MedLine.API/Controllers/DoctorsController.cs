using MedLine.API.Contracts;
using MedLine.Application.Services;
using MedLine.Core.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedLine.API.Controllers
{
    [Authorize(Policy = "Пользователь")]
    [ApiController]
    [Route("[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorsService _doctorsService;

        public DoctorsController(IDoctorsService doctorsService)
        {
            _doctorsService = doctorsService;
        }

        [HttpGet(nameof(GetDoctors))]
        public async Task<ActionResult<List<Doctor>>> GetDoctors() 
        {
            var doctors = await _doctorsService.GetAllDoctor();
            var response = doctors.Select(b =>
            new DoctorsResponse(b.Id, b.FullName, b.Specialization, b.Description));
            return Ok(response);
        }

        [HttpGet(nameof(GetDoctor))]
        public async Task<ActionResult<Doctor>> GetDoctor(Guid id)
        { 
            var doctor = await _doctorsService.GetDoctorById(id);
            if (doctor == null) return Empty;
            var response = new DoctorsResponse(doctor.Id, doctor.FullName, doctor.Specialization, doctor.Description);
            return Ok(response);
        }

        [HttpPost(nameof(CreateDoctor))]
        public async Task<IActionResult> CreateDoctor(DoctorsRequestWithId request)
        {
            var doctor = new Doctor(
                request.id, 
                request.fullName,
                request.specialization,
                request.description);

            var doctorId = await _doctorsService.CreatDoctor(doctor);
            return Ok(doctorId);
        }

        [HttpPut("UpdateDoctor/{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateDoctor(Guid id, DoctorsRequest request)
        {
            var doctorId = await _doctorsService.UpdateDoctor(id, request.fullName, request.specialization, request.description);
            return Ok(doctorId);
        }

        [HttpDelete("DeleteDoctor/{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteDoctor(Guid id)
        { 
            return Ok(await _doctorsService.DeleteDoctor(id));
        }
    }
}
