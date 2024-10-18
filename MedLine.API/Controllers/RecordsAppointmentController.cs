using MedLine.API.Contracts;
using MedLine.Application.Services;
using MedLine.Core.Abstractions;
using MedLine.Core.Models;
using MedLine.Core.Models.Enum;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedLine.API.Controllers
{
    [Authorize(Policy = "Пользователь")]
    [ApiController]
    [Route("[controller]")]
    public class RecordsAppointmentController : ControllerBase
    {
        private readonly IRecordsAppointmentService _recordsAppointmentService;
        private readonly IDoctorsService _doctorsService;
        private readonly IPatientsService _patientsService;

        public RecordsAppointmentController(IRecordsAppointmentService recordsAppointmentService, IDoctorsService doctorsService, IPatientsService patientsService)
        {
            _recordsAppointmentService = recordsAppointmentService;
            _doctorsService = doctorsService;
            _patientsService = patientsService;
        }

        [HttpGet(nameof(GetRecords))]
        public async Task<ActionResult<List<RecordsAppointmentResponse>>> GetRecords()
        {
            var records = await _recordsAppointmentService.GetAllRecords();;

            var sortedRecords = records.OrderBy(record => record.DateAppointment)
                .ThenBy(record => record.TimeAppointment);

            var response = sortedRecords.Select(b =>
                new RecordsAppointmentResponse(b.Id, b.DateAppointment.ToShortDateString(), b.TimeAppointment.ToShortTimeString(), b.RoomNumber, 
                b.IsReserved, b.PatientId, b.DoctorId, b.Status));
            return Ok(response);
        }

        [HttpGet(nameof(GetRecordsWithName))]
        public async Task<ActionResult<List<RecordsWithFullNameResponse>>> GetRecordsWithName()
        {
            var doctors = await _doctorsService.GetAllDoctor();
            var patients = await _patientsService.GetAllPatient();
            var records = await _recordsAppointmentService.GetAllRecords();

            var response = from record in records
                           join doctor in doctors on record.DoctorId equals doctor.Id into rd
                           from doctor in rd.DefaultIfEmpty()
                           join patient in patients on record.PatientId equals patient.Id into dp
                           from patient in dp.DefaultIfEmpty()
                           select new RecordsWithFullNameResponse
                           (
                               record.Id,
                               record.DateAppointment.ToShortDateString(),
                               record.TimeAppointment.ToShortTimeString(),
                               record.RoomNumber,
                               record.IsReserved,
                               record?.PatientId,
                               patient?.FullName,
                               record.Id,
                               doctor.FullName,
                               record.Status
                           );

            return Ok(response);
        }

        [HttpGet(nameof(GetRecordById))]
        public async Task<ActionResult<RecordsAppointmentResponse>> GetRecordById(Guid id)
        { 
            var records = await _recordsAppointmentService.GetRecordById(id);
            var response = new RecordsAppointmentResponse(records.Id, records.DateAppointment.ToShortDateString(), records.TimeAppointment.ToShortTimeString(), records.RoomNumber, records.IsReserved,
                records.PatientId, records.DoctorId, records.Status);

            return Ok(records);
        }

        [HttpGet(nameof(GetRecordsByDoctorId))]
        public async Task<ActionResult<List<RecordsAppointmentResponse>>> GetRecordsByDoctorId(Guid doctorId)
        {
            var records = await _recordsAppointmentService.GetRecordsByDoctorId(doctorId);

            var response = records.Select(b =>
                new RecordsAppointmentResponse(b.Id, b.DateAppointment.ToShortDateString(), b.TimeAppointment.ToShortTimeString(), b.RoomNumber,
                b.IsReserved, b.PatientId, b.DoctorId, b.Status));

            return Ok(response);
        }

        [HttpGet(nameof(GetRecordsWithPatientName))]
        public async Task<ActionResult<List<RecordsWithFullNameResponse>>> GetRecordsWithPatientName(Guid doctorId)
        {
            var records = await _recordsAppointmentService.GetRecordsByDoctorId(doctorId);

            var patients = await _patientsService.GetAllPatient();

            var response = 
                from record in records
                join patient in patients on record.PatientId equals patient.Id into rp
                from patient in rp.DefaultIfEmpty()
                select new RecordsWithFullNameResponse
                (
                    record.Id,
                    record.DateAppointment.ToShortDateString(),
                    record.TimeAppointment.ToShortTimeString(),
                    record.RoomNumber,
                    record.IsReserved,
                    record?.PatientId,
                    patient?.FullName,
                    record.DoctorId,
                    null,
                    record.Status
                );

            return Ok(response);
        }

        [HttpGet(nameof(GetFreeRecordsByDoctorId))]
        public async Task<ActionResult<List<RecordsAppointmentResponse>>> GetFreeRecordsByDoctorId(Guid doctorId)
        {
            var records = await _recordsAppointmentService.GetFreeRecordsByDoctorId(doctorId);

            if (records == null) return Ok(null);

            var response = records.Select(b =>
                new RecordsAppointmentResponse(b.Id, b.DateAppointment.ToShortDateString(), b.TimeAppointment.ToShortTimeString(), b.RoomNumber,
                b.IsReserved, b.PatientId, b.DoctorId, b.Status));

            return Ok(response);
        }

        [HttpGet(nameof(GetRecordsByPatientId))]
        public async Task<ActionResult<List<RecordsAppointmentResponse>>> GetRecordsByPatientId(Guid patientId)
        {
            var doctors = await _doctorsService.GetAllDoctor();

            var records = await _recordsAppointmentService.GetRecordsByPatientId(patientId);

            var response = from record in records
                           join doctor in doctors on record.DoctorId equals doctor.Id into rd
                           from doctor in rd.DefaultIfEmpty()
                           select new RecordsWithFullNameResponse
                           (
                               record.Id,
                               record.DateAppointment.ToShortDateString(),
                               record.TimeAppointment.ToShortTimeString(),
                               record.RoomNumber,
                               record.IsReserved,
                               record?.PatientId,
                               null,
                               record.DoctorId,
                               doctor.FullName,
                               record.Status
                           );

            return Ok(response);
        }

        [HttpGet(nameof(GetDictionaryRecords))]
        public async Task<ActionResult<Dictionary<string, RecordsAppointmentResponse>>> GetDictionaryRecords(Guid doctorId)
        {
            var records = await _recordsAppointmentService.GetFreeRecordsByDoctorId(doctorId);

            if (records == null) return Ok(null);

            var response = records.Select(b =>
                new RecordsAppointmentResponse(b.Id, b.DateAppointment.ToShortDateString(), b.TimeAppointment.ToShortTimeString(), b.RoomNumber,
                    b.IsReserved, b.PatientId, b.DoctorId, b.Status));

            var dictionaryResponse = new Dictionary<string, List<RecordsAppointmentResponse>>();

            foreach (var dateKey in response.Select(r => r.dateAppointment).Distinct())
            {
                dictionaryResponse.Add(dateKey, response.Where(r => r.dateAppointment.Equals(dateKey)).ToList());
            }

            return Ok(dictionaryResponse);
        }

        [HttpPost(nameof(CreateRecord))]
        public async Task<IActionResult> CreateRecord(RecordsCreateModelRequest request)
        {
            for (var i = 0; i < request.dateAppointment.Length; i++)
            {
                for (var j = 0; j < request.timeAppointment.Length; j++)
                {
                    var recordAppoinment = new RecordAppointment(
                        Guid.NewGuid(),
                        request.dateAppointment[i],
                        request.timeAppointment[j],
                        request.roomNumber,
                        request.isReserved,
                        null,
                        request.doctorId,
                        StatusRecordEnum.Создана);
                    var recordId = await _recordsAppointmentService.CreatRecord(recordAppoinment);
                }

            }
            return Ok();
        }

        [HttpPut("UpdateRecord/{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateRecord(Guid id, RecordsAppointmentRequest request)
        {
            var recordFromDb = await _recordsAppointmentService.GetRecordById(id);
            if (request.patientId.HasValue)
            {
                var recordsForPatient = await _recordsAppointmentService.GetRecordsByPatientId(request.patientId);
                if (recordsForPatient.Count(r => r.Status == StatusRecordEnum.ОжидаетВыполнения) >= 3)
                    return BadRequest();
            }

            if (recordFromDb.IsReserved) return BadRequest(recordFromDb.Id);

            var recordId = await _recordsAppointmentService.UpdateRecord(id, request.dateAppointment, request.timeAppointment, 
                request.roomNumber, request.isReserved, request.patientId,
                request.doctorId, request.status);
            return Ok(recordId);
        }

        [HttpPut("CancelingRecord/{id:guid}")]
        public async Task<ActionResult<Guid>> CancelingRecord(Guid id)
        {
            var recordFromDb = await _recordsAppointmentService.GetRecordById(id);
            if (recordFromDb == null) return BadRequest();

            var recordId = await _recordsAppointmentService.UpdateRecord(id, recordFromDb.DateAppointment, recordFromDb.TimeAppointment,
                recordFromDb.RoomNumber, false, null,
                recordFromDb.DoctorId, StatusRecordEnum.Создана);
            return Ok(recordId);
        }

        [HttpDelete("DeleteRecord/{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteRecord(Guid id)
        {
            return Ok(await _recordsAppointmentService.DeleteRecord(id));
        }
    }
}
