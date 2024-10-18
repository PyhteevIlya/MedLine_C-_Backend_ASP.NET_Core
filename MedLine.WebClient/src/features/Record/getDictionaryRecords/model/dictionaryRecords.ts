import { Record } from "../../../../entities/Record/model/type/record"

export interface DictionaryRecords {
    [dateAppointment: string]: Record[]
}