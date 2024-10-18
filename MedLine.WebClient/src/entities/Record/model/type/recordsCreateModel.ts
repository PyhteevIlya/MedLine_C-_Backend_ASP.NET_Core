export interface RecordsCreateModel {
    dateAppointment?: string[] | string;
    timeAppointment?: string[] | string;
    roomNumber?: string;
    isReserved: boolean;
    doctorId?: string;
    description?: string;
}