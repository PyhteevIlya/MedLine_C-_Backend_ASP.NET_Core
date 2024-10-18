import { useEffect, useState } from 'react';
import { fetchDictionaryRecords } from '../../../features/Record/getDictionaryRecords/sercices/fetchDictionaryRecords';
import { useNavigate, useParams } from 'react-router-dom';
import { DictionaryRecords } from '../../../features/Record/getDictionaryRecords/model/dictionaryRecords';
import { Button, Result } from 'antd';
import { MehTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import './ScheduleTimeSlots.scss';

const ScheduleTimeSlot = () => {
    
    const params = useParams()
    const [dictionaryRecords, setDictionary] = useState<DictionaryRecords>({});
    dayjs.locale('ru')

    useEffect(() => {
        const fetchData = async () => {
        const response = await fetchDictionaryRecords(params)
            setDictionary(response)
        }
        fetchData();
    }, [])
    
    const navigate = useNavigate()

    const routeAppointment = (record: any) => {
        navigate(`/doctor/${params.id}/${params.fullName}/${params.specialization}/${record.id}/${record.dateAppointment}/${record.timeAppointment}`)
    }

    if(Object.keys(dictionaryRecords!)[0] == null){
        return(
            <div className='pageContainer shadow-[0_0px_20px_10px_rgba(34,60,80,0.2)] bg-white rounded-md'>
                <Result icon={<MehTwoTone/>} title="У врача пока нет свободных мест для записи"></Result>
            </div>
        )
    }

    return (
        <div className='pageContainer shadow-[0_0px_20px_10px_rgba(34,60,80,0.2)] bg-white rounded-md pb-4 px-5'>
            <div className='timeSlots-header'>
                <h1>
                    Расписание врача
                </h1>
            </div>
            {Object.keys(dictionaryRecords!).map((timeAppointment) => (
                <div key={timeAppointment} className='timeSlots-onDay'>
                    <h3 className='timeSlots-onDay__header'>
                        {dayjs(timeAppointment, 'DD.MM.YYYY').format('D MMMM - dddd')}
                    </h3>
                    <div className='timeSlots-onDay__buttons'>
                        {dictionaryRecords[timeAppointment].map((record) => (
                            <Button
                                key={record.id}
                                type={'primary'}
                                className='button-slot'
                                onClick={() => routeAppointment(record)}
                            >
                                {record.timeAppointment}
                            </Button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default ScheduleTimeSlot;