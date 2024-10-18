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
    public class PatientsController : ControllerBase
    {
        private readonly IPatientsService _patientService;

        public PatientsController(IPatientsService patientsService)
        {
            _patientService = patientsService;
        }

        [HttpGet(nameof(GetPatients))]
        public async Task<ActionResult<List<Patient>>> GetPatients()
        { 
            var patients = await _patientService.GetAllPatient();
            var response = patients.Select(b =>
                new PatientResponse(b.Id, b.FullName, b.PersonalPhone, b.JobPhone, b.TabelNumber, b.OrgUnit, b.JobRole, b.ProgramMedicalPolicy));
            return Ok(response);
        }

        [HttpGet(nameof(GetPatientById))]
        public async Task<ActionResult<List<Patient>>> GetPatientById(Guid id)
        {
            var patients = await _patientService.GetPatientById(id);
            var response = new PatientResponse(patients.Id, patients.FullName, patients.PersonalPhone, patients.JobPhone,
                patients.TabelNumber, patients.OrgUnit, patients.JobRole, patients.ProgramMedicalPolicy);
            return Ok(response);
        }

        [HttpPost(nameof(CreatePatient))]
        public async Task<IActionResult> CreatePatient(PatientRequest request)
        {
            var patientFromDb = await _patientService.GetPatientById(request.id);
            if (patientFromDb == null)
            {
                var patient = new Patient(
                    request.id,
                    request.fullName,
                    request.personalPhone,
                    request.jobPhone,
                    request.tabelNumber,
                    request.orgUnit,
                    request.jobRole,
                    request.programMedicalPolicy);

                var patientId = await _patientService.CreatePatient(patient);
                return Ok(patientId);
            }
            else
            {
                await _patientService.UpdatePatient(request.id, request.fullName, request.personalPhone,
                    request.jobPhone,
                    request.tabelNumber, request.orgUnit, request.jobRole, request.programMedicalPolicy);
            }

            return Ok(patientFromDb);
        }

        [HttpPut("UpdatePatient/{id:guid}")]
        public async Task<ActionResult<Guid>> UpdatePatient(Guid id, PatientRequest request)
        {
            var patientId = await _patientService.UpdatePatient(id, request.fullName, request.personalPhone, request.jobPhone,
                request.tabelNumber, request.orgUnit, request.jobRole, request.programMedicalPolicy);
            return Ok(patientId);
        }

        [HttpDelete("DeletePatient/{id:guid}")]
        public async Task<ActionResult<Guid>> DeletePatient(Guid id)
        {
            return Ok(await _patientService.DeletePatient(id));
        }
    }
}
