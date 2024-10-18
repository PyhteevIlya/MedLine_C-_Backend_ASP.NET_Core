export interface User {
    id: string;
    fullName: string;
    personalPhone: any;
    tabelNumber: string;
    orgUnit: string;
    jobRole: string;
    role: RoleEnum;
}

export enum RoleEnum {
    Пользователь = 0,
    Врач = 1,
    Администратор = 2,
    Разработчик = 3
}