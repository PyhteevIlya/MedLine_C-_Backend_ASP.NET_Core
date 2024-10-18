import { makeAutoObservable } from "mobx";
import { deleteDoctor } from "../../../../features/Doctor/deleteDoctor/services/deleteDoctor";
import { Doctor } from "../type/doctor";
import { addDoctor } from "../../../../features/Doctor/addDoctor/services/addDoctor";

class DoctorViewStore {
    id: string = "";
    key: React.Key = "";
    fullName: string ="";
    specialization: string = "";
    description: string = "";
    isAdmin: boolean =false;
    

    constructor() {
        makeAutoObservable(this)
    };
    
        setId(id:string){
            this.id = id;
        }
        setTime(fullName: string){
            this.fullName = fullName;
        }
        setIsReserved(specialization: string){
            this.specialization = specialization;
        }
        setDoctorDescription(description: string){
            this.description = description;
        }
        setDoctorIsAdmin(isAdmin: boolean){
            this.isAdmin = isAdmin;
        }

        createDoctorsAction = async () => {
            try {
                const doctorCreate: Doctor = {
                    id: this.id,
                    fullName: this.fullName,
                    specialization: this.specialization,
                    description: this.description,
                    key: this.key
                }
                await addDoctor(doctorCreate)
            } catch(error) {
                console.log(error)
            }
        }
        deleteDoctorAction = async (id: any) => {
            try {
                await deleteDoctor(id);
            } catch(error) {
                console.log(error)
            }
        }
}
const doctorViewStore = new DoctorViewStore();
export default doctorViewStore;