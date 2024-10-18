import { useEffect, useState } from 'react';
import { ConfigProvider, DatePicker, Result, Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './AppointmentSchedule.scss';
import { Record } from '../../../entities/Record/model/type/record';
import RecordViewStore from '../../../entities/Record/model/store/recordViewStore';
import { MehTwoTone } from '@ant-design/icons';
import locale from 'antd/locale/ru_RU';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const AppointmentSchedule = () => {
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            await RecordViewStore.getFreeRecordsByDoctorId(params);
            setFilterData(RecordViewStore.record);
        }
        fetchData();
    }, [])

    const navigate = useNavigate()

    const routeAppointment = (record: Record) => {
        navigate(`/doctor/${params.id}/${params.fullName}/${params.specialization}/${record.id}/${record.dateAppointment}/${record.timeAppointment}`)
    }

    const [ dateFilter, setFilterData ] = useState(RecordViewStore.record);

    const onChangeDate = (date: any, dateString: any) => {
        if (date) {
            const filtered = RecordViewStore.record?.filter(r => {
                return dayjs(r.dateAppointment, 'DD.MM.YYYY').isSame(dayjs(dateString, 'DD.MM.YYYY'))
            });
            setFilterData(filtered);
        } else {
            setFilterData(RecordViewStore.record)
        }
        
    };
    
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        //блокировка дат меньше текущей даты и больше текущей даты на 14 дней
        return current > dayjs().add(14, 'day').startOf('day') || current < dayjs().startOf('day');
    };
    
    dayjs.extend(customParseFormat);


    const columns: any =[
        {
            title: 'Дата',
            dataIndex: 'dateAppointment',
            key: 'dateAppointment',
            align: 'center'
        },
        {
            title: 'Время',
            dataIndex: 'timeAppointment',
            key: 'timeAppointment',
            align: 'center'
        },
        {
            title: 'Тип',
            dataIndex: 'typeAppointment',
            key: 'typeAppointment',
            align: 'center'
        },
        {
            title: 'Кабинет',
            dataIndex: 'roomNumber',
            key: 'roomNumber',
            align: 'center'
        },
        {
            title: 'Действие',
            align: 'center',
            Key: 'action',
            render: (_text: string, record: Record) => (
                <a onClick={() => routeAppointment(record)} className='text-blue-500'>Записаться</a>
            )
        },
    ]
    if(RecordViewStore.record?.length === 0){
        return(
            <div className='pageContainer shadow-[0_0px_20px_10px_rgba(34,60,80,0.2)] bg-white rounded-md'>
                <Result icon={<MehTwoTone/>} title="У врача пока нет свободных мест для записи"></Result>
            </div>
        )
    }

    return (
        <>
            <div className='datePickerForAppointment'>
                <ConfigProvider locale={locale}>
                    <DatePicker
                        className="datePicker"
                        onChange={onChangeDate}
                        format="DD.MM.YYYY"
                        maxTagCount="responsive"
                        disabledDate={disabledDate}
                        />
                </ConfigProvider>
            </div>
            <div className='pageContainer shadow-[0_0px_20px_10px_rgba(34,60,80,0.2)] bg-white rounded-md'>
                <ConfigProvider theme={{
                    components: {
                    Table: {
                        headerBg: '#61a7f8',
                        headerColor: '#ffffff',
                        algorithm: true, // Enable algorithm
                    },
                    }
                }
                }>
                    <Table columns={columns} dataSource={dateFilter}/>
                </ConfigProvider>
            </div>
        </>
    )
}

export default AppointmentSchedule;