export interface Record {
        id: string;
        key: React.Key;
        dateAppointment: string;
        timeAppointment: string;
        isReserved: boolean;
        patientId: string;
        patientFullName: string;
        doctorId: string;
        doctorFullName: string;
        roomNumber: any;
        status: Status;
}
export enum Status {
        Создана = 0,
        Ожидание = 1,
        Выполнена = 2,
        Отменена = 3
}