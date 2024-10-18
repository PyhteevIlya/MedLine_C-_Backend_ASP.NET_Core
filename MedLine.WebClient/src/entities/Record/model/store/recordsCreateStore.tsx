import { makeAutoObservable } from "mobx";
import { RecordsCreateModel } from "../type/recordsCreateModel";
import { createRecord } from "../../../../features/Record/createRecordAppointment/services/createRecordAppointment";

class RecordsCreateStore {
    recordsCreateModel?: RecordsCreateModel[];
    dateAppointment?: string | string[];
    timeAppointment?: string | string[];
    roomNumber?: string;
    isReserved: boolean = false;
    doctorId?: string;
    

    constructor() {
        makeAutoObservable(this)
    };
    
        setDate(date:string | string[]){
            this.dateAppointment = date;
        }
        setTime(time:string | string[]){
            this.timeAppointment = time;
        }
        setRoom(roomNumber:string){
            this.roomNumber = roomNumber;
        }
        setIsReserved(isReserved:boolean){
            this.isReserved = isReserved;
        }
        setDoctorId(doctorId:string){
            this.doctorId = doctorId;
        }

        createRecordsAction = async () => {
            try {
                const recordsCreate: RecordsCreateModel = {
                    dateAppointment: this.dateAppointment,
                    timeAppointment: this.timeAppointment,
                    roomNumber: this.roomNumber,
                    isReserved: this.isReserved,
                    doctorId: this.doctorId,
                }
                await createRecord(recordsCreate)
            } catch(error) {
                console.log(error)
            }
        }
}
const recordsCreateStore = new RecordsCreateStore();
export default recordsCreateStore;