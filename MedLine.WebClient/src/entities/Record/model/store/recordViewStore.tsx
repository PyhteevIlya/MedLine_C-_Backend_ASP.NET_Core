import { makeAutoObservable, runInAction } from "mobx";
import { Record, Status } from "../type/record";
import { fetchAllRecordsWithName } from "../../../../features/Record/getAllRecords/services/fetchAllRecordsWithName";
import { fetchRecordsByDoctorId } from "../../../../features/Record/getRecordsByDoctorId/services/fetchRecordsByDoctorId";
import { fetchRecordsById } from "../../../../features/Record/getRecordAppointmentById/services/fetchRecordById";
import { deleteRecordAppointment } from "../../../../features/Record/deleteRecordAppointment/services/deleteRecordAppointment";
import { fetchRecordsByPatientId } from "../../../../features/Record/getRecordsByPatientId/services/fetchRecordsByPatientId";
import { fetchFreeRecordsByDoctorId } from "../../../../features/Record/getRecordsByDoctorId/services/fetchFreeRecordsByDoctorId";
import { fetchRecordsByDoctorIdWithPatientName } from "../../../../features/Record/getRecordsByDoctorId/services/fetchRecordsWithPatientName";

class RecordViewStore {
    record?: Record[];
    recordForDoctorProfile?: Record[];

    constructor() {
        makeAutoObservable(this)
    };

        getAllRecordsWithNameAction = async () => {
            try {
                const response = await fetchAllRecordsWithName();
                runInAction(() => {
                    const records = response.map((record: Record, index: React.Key) => ({
                        key: index,
                        id: record.id,
                        dateAppointment: record.dateAppointment,
                        timeAppointment: record.timeAppointment,
                        isReserved: record.isReserved,
                        patientId: record.patientId,
                        patientFullName: record.patientFullName,
                        roomNumber: record.roomNumber,
                        doctorFullName: record.doctorFullName,
                        doctorId: record.doctorId,
                        status: Status[record.status]
                    }))
                    this.record = records;
                })
            } catch(error) {
                console.log(error)
            }
        }

        getRecordsByDoctorId = async (id: any) => {
            try {
                const response = await fetchRecordsByDoctorId(id);
                runInAction(() => {
                const records = response.map((record: Record, index: React.Key) => ({
                key: index,
                id: record.id,
                dateAppointment: record.dateAppointment,
                timeAppointment: record.timeAppointment,
                roomNumber: record.roomNumber,
                isReserved: record.isReserved,
                patientId: record.patientId,
                doctorId: record.doctorId,
                status: Status[record.status]
            }))
                this.record = records;
            })} catch (error)
            {
                console.log(error)
            }
        }

        getRecordsByDoctorIdWithPatientName = async (id: any) => {
            try {
                const response = await fetchRecordsByDoctorIdWithPatientName(id);
                runInAction(() => {
                const records = response.map((record: Record, index: React.Key) => ({
                key: index,
                id: record.id,
                dateAppointment: record.dateAppointment,
                timeAppointment: record.timeAppointment,
                roomNumber: record.roomNumber,
                isReserved: record.isReserved,
                patientId: record.patientId,
                patientFullName: record.patientFullName,
                doctorId: record.doctorId,
                status: Status[record.status]
            }))
                this.recordForDoctorProfile = records;
            })} catch (error)
            {
                console.log(error)
            }
        }

        getFreeRecordsByDoctorId = async (id: any) => {
            try {
                const response = await fetchFreeRecordsByDoctorId(id);
                runInAction(() => {
                const records = response.map((record: Record, index: React.Key) => ({
                key: index,
                id: record.id,
                dateAppointment: record.dateAppointment,
                timeAppointment: record.timeAppointment,
                roomNumber: record.roomNumber,
                isReserved: record.isReserved,
                patientId: record.patientId,
                doctorId: record.doctorId,
                status: Status[record.status]
            }))
                this.record = records;
            })} catch (error)
            {
                console.log(error)
            }
        }

        getRecordsByPatientId = async (patientId: any) => {
            try {
                const response = await fetchRecordsByPatientId(patientId);
                runInAction(() => {
                const records = response?.headers.map((record: Record, index: React.Key) => ({
                key: index,
                id: record.id,
                dateAppointment: record.dateAppointment,
                timeAppointment: record.timeAppointment,
                roomNumber: record.roomNumber,
                isReserved: record.isReserved,
                patientId: record.patientId,
                doctorId: record.doctorId,
                status: Status[record.status]
            }))
                this.record = records;
            })} catch (error)
            {
                console.log(error)
            }
        }
        
        getRecordById = async (id: any) => {
            try {
                const response = await fetchRecordsById(id);
                runInAction(() => {
                const records = response.map((record: Record, index: React.Key) => ({
                key: index,
                id: record.id,
                dateAppointment: record.dateAppointment,
                timeAppointment: record.timeAppointment,
                roomNumber: record.roomNumber,
                isReserved: record.isReserved,
                patientId: record.patientId,
                doctorId: record.doctorId,
                status: Status[record.status]
            }))
                this.record = records;
            })} catch (error)
            {
                console.log(error)
            }
        }
        deleteRecord = async (id: string) => {
            try {
                await deleteRecordAppointment(id);
                runInAction(() => {
                    this.getAllRecordsWithNameAction()
            })} catch(error) {
                    console.log(error)
                }
            
        }
}

export default new RecordViewStore;