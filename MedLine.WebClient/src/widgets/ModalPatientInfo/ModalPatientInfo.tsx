import { Button, Modal } from "antd";
import { useState } from "react";
import { fetchPatientById } from "../../features/Patient/getPatientById/services/fetchPatientById";
import { Patient } from "../../entities/Patient/model/type/patient";
import './ModalPatientInfo.scss'

interface patientInfo {
    patientId: string;
    patientFullName: string;
}

const ModalPatientInfo: React.FC<patientInfo> = ({patientId, patientFullName}) => {

    const [open, setOpen] = useState(false);
    const [patientDb, setPatientDb] = useState<Patient>();
        const showModal = async () => {
            setOpen(true);
            try{
                const fetchData = async () => {
                    var response = await fetchPatientById(patientId);
                    setPatientDb(response?.data)
                }
                fetchData();
            } catch {
                console.log("error")
            }
        };

        const handleCancelDeleteDoctor = () => {
            setOpen(false);
        };
        const handleOkDeleteDoctor = () => {
            setOpen(false);
        };

    if(patientId == null) {
        return (
            <></>
        )
    }

    return (
        <>
            <Button onClick={showModal} type='text'>{patientFullName}</Button>
            <Modal title={<div style={{fontSize: '24px'}}>Информация о пациенте</div>}
                            style={{}}
                            open={open}
                            onOk={handleOkDeleteDoctor}
                            onCancel={handleCancelDeleteDoctor}
                            cancelText="Отмена"
                            okText="Ok"
                            width={1000} >
                        <div className="patient-info-form">
                            <div className="patient-info-form__patientProp patientProp">
                                <h1 className="patientProp__header">
                                    ФИО:
                                </h1>    
                                <p className="patientProp__paragraph">
                                    {patientDb?.fullName}
                                </p>
                            </div>
                            <div className="patient-info-form__patientProp patientProp">
                                <h1 className="patientProp__header">
                                    Табельный номер:
                                </h1>   
                                <p className="patientProp__paragraph">
                                    {patientDb?.tabelNumber}
                                </p>
                            </div>
                            <div className="patient-info-form__patientProp patientProp">
                                <h1 className="patientProp__header">
                                    Рабочий номер телефона:
                                </h1>
                                <p className="patientProp__paragraph">
                                    {patientDb?.jobPhone}
                                </p>
                            </div>    
                            <div className="patient-info-form__patientProp patientProp">
                                <h1 className="patientProp__header">
                                    Должность:
                                </h1>
                                <p className="patientProp__paragraph">
                                    {patientDb?.jobRole}
                                </p>
                            </div>    
                            <div className="patient-info-form__patientProp patientProp">
                                <h1 className="patientProp__header">
                                    Отдел:
                                </h1>
                                <p className="patientProp__paragraph">
                                    {patientDb?.orgUnit}
                                </p>
                            </div>
                            <div className="patient-info-form__patientProp patientProp">
                                <h1 className="patientProp__header">
                                    Личный номер телефона:
                                </h1>
                                <p className="patientProp__paragraph">
                                    {patientDb?.personalPhone}
                                </p>
                            </div>  
                            <div className="patient-info-form__patientProp patientProp"> 
                                <h1 className="patientProp__header">
                                    Медицинский полис:
                                </h1>
                                <p className="patientProp__paragraph">
                                    {patientDb?.programMedicalPolicy}
                                </p>
                            </div>
                        </div>
            </Modal>
        </>
    )
}

export default ModalPatientInfo