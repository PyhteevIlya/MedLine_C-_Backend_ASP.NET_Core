import { useEffect, useState } from 'react';
import './Main.scss';
import DoctorCard from '../MainPage/card/DoctorCard';
import { fetchDoctors } from '../../features/Doctor/getDoctors/services/fetchDoctors';
import { Breadcrumb, Spin } from 'antd';
import { Doctor } from '../../entities/Doctor/model/type/doctor';

const Main = () => {

    const [loading, setLoading] = useState<boolean>(true)

    const [cards, setDoctorCards] = useState<Array<Doctor>>()

    useEffect(() => {
        const fetchData = async () => {
        var doctors = await fetchDoctors();
        setDoctorCards(doctors.map((card: Doctor) => ({
            id: card.id,
            fullName: card.fullName,
            specialization: card.specialization,
        })))
        }
        setLoading(false)
        fetchData();
    }, [])

    return (
        <>
        {loading? (<Spin spinning={loading}/>) :
        (
            <>
            <div className='breadCrumb'>
                <Breadcrumb items={[
                    {
                        title:<a href='/listofdoctors'>Записаться на прием</a>
                    }
                ]}/>
            </div>
            <div className='divM'>
                <div className="list">
                    {cards?.map(cards => 
                        <DoctorCard id={cards.id} fullName={cards.fullName} specialization={cards.specialization} key={cards.id}/>
                    )}
                </div>
            </div>
            </>
        )}
        </>     
    );
};

export default Main