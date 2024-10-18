import { useParams } from 'react-router-dom';
import './Doctor.scss';
import DoctorInfo from '../../widgets/DoctorInfo/DoctorInfo';
import { useEffect, useState } from 'react';
import { fetchDoctor } from '../../features/Doctor/getDoctor/services/fetchDoctor';
import { Breadcrumb } from 'antd';
import ScheduleTimeSlot from './ScheduleTimeSlot/ScheduleTimeSlots';


const Doctor = () => {
    const params = useParams()

    const [doctor, setDoctor] = useState(
        {id:"1", fullName: 'Иванов Иван Иванович', specialization: 'терапевт', description: ' '},
    )

    useEffect(() => {
        const fetchData = async () => {
        var doctor = await fetchDoctor(params);
        setDoctor(doctor)
        }
        fetchData();
    }, [])

    return (
        <>
            <div className='breadCrumb'>
                <Breadcrumb items={[
                    {
                        title:<a href='/listofdoctors'>Записаться на прием</a>
                    },
                    {
                        title:<a href={`/doctor/${params.id}/${params.fullName}/${params.specialization}`}>{params.fullName}</a>
                    }
                ]}/>
            </div>
            <div className='doctorDiv'>
                <DoctorInfo id={doctor.id} fullName={doctor.fullName} specialization={doctor.specialization} description={doctor.description}/>
                {/* <AppointmentSchedule/> */}
            </div>
            <ScheduleTimeSlot/>
        </>
    );
};

export default Doctor
