import { useEffect, useState } from "react";
import DoctorInfo from "../../widgets/DoctorInfo/DoctorInfo";
import DoctorSchedule from "./DoctorShared/DoctorSchedule";
import { fetchDoctor } from "../../features/Doctor/getDoctor/services/fetchDoctor";
import rootStore from "../../app/StoreProvider/rootStore/rootStore";
import { Result, Spin } from "antd";
import { ReconciliationTwoTone } from '@ant-design/icons';
import { Doctor } from "../../entities/Doctor/model/type/doctor";
import ModalAddSchedule from "../../widgets/ModalAddSchedule/ModalAddSchedule";
import './DoctorProfile.scss';
import ModalEditDoctor from "./ModalEditDoctor/ModalEditDoctor";

const DoctorProfile = () => {
    const [doctorProfile, setProfile ] = useState<Doctor | null>(null);

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
        var response = await fetchDoctor(rootStore.User);
        if (response != "")
        setProfile(response)
        }
        setLoading(false)
        fetchData();
    }, [])

    const handleDoctorUpdate = (updateDoctor: Doctor) => {
        setProfile(updateDoctor)
    }

    if(loading) {
        return(
            <Spin spinning={loading} fullscreen/>
        )
    }

    if(doctorProfile == null) {
        return <><Result icon={<ReconciliationTwoTone/>} title="Вам пока не создали профиль"></Result></>
    }
    return (
        <div>
            <div className="button-editDoctor">
                <ModalEditDoctor doctorProfile={doctorProfile} onUpdateDoctor={handleDoctorUpdate}/>
            </div>
            <DoctorInfo id={doctorProfile.id} fullName={doctorProfile.fullName} specialization={doctorProfile.specialization} description={doctorProfile.description} />
            <div className="button-addSchedule">
                <ModalAddSchedule/>
            </div>
            <DoctorSchedule/>
        </div>
    );
}
export default DoctorProfile