import React from "react";
import Main from "../../pages/MainPage/Main";
import MyRecords from "../../pages/MyRecordsPage/MyRecords";
import Doctor from "../../pages/DoctorPage/Doctor";
import FormRecord from "../../pages/FormRecordPage/FormRecord";
import SharedSchedule from "../../pages/SharedSchedulePage/SharedSchedule";
import DoctorProfile from "../../pages/DoctorProfilePage/DoctorProfile";
import InformationPage from "../../pages/InformationPage/InformationPage";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames{
    INFORMATIONPAGE ='/',
    MAIN = '/listofdoctors',
    MYRECORDS = '/myrecord',
    DOCTORPROFILE = '/doctorprofile', 
    DOCTOR = '/doctor/:id/:fullName/:specialization',
    FORM ='/doctor/:id/:fullName/:specialization/:recordid/:date/:time',
    SHAREDSCHEDULE = '/sharedschedule'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.INFORMATIONPAGE, exact: true, component: InformationPage},
    {path: RouteNames.MAIN, exact: true, component: Main},
    {path: RouteNames.MYRECORDS, exact: true, component: MyRecords},
    {path: RouteNames.DOCTOR, exact: true, component: Doctor},
    {path: RouteNames.FORM, exact: true, component: FormRecord},
]

export const doctorRoutes: IRoute[] = [
    {path: RouteNames.INFORMATIONPAGE, exact: true, component: InformationPage},
    {path: RouteNames.MAIN, exact: true, component: Main},
    {path: RouteNames.MYRECORDS, exact: true, component: MyRecords},
    {path: RouteNames.DOCTOR, exact: true, component: Doctor},
    {path: RouteNames.FORM, exact: true, component: FormRecord},
    {path: RouteNames.DOCTORPROFILE, exact: true, component: DoctorProfile}

]

export const adminRoutes: IRoute[] = [
    {path: RouteNames.INFORMATIONPAGE, exact: true, component: InformationPage},
    {path: RouteNames.MAIN, exact: true, component: Main},
    {path: RouteNames.MYRECORDS, exact: true, component: MyRecords},
    {path: RouteNames.DOCTOR, exact: true, component: Doctor},
    {path: RouteNames.FORM, exact: true, component: FormRecord},
    {path: RouteNames.DOCTORPROFILE, exact: true, component: DoctorProfile },
    {path: RouteNames.SHAREDSCHEDULE, exact: true, component: SharedSchedule}
]