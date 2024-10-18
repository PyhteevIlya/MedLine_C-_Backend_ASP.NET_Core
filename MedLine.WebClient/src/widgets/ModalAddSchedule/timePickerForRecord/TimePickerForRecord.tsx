import { Button, TimePicker } from "antd";
import { useState } from "react";
import { CloseOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import recordsCreateStore from "../../../entities/Record/model/store/recordsCreateStore";
import locale from "antd/lib/date-picker/locale/ru_RU";
import dayjs from 'dayjs';

interface TimeSlot {
    id: string;
    timeAppointment: string;
}

const TimePickerForRecord = () => {

    const format = 'HH:mm:00';

    const [timePickers, setTimePickers] = useState<TimeSlot[]>([
        {
            id: '1',
            timeAppointment: '08:00:00'
        },
        {
            id: '2',
            timeAppointment: '09:00:00'
        },
        {
            id: '3',
            timeAppointment: '10:00:00'
        },
        {
            id: '4',
            timeAppointment: '11:00:00'
        },
        {
            id: '5',
            timeAppointment: '12:00:00'
        },
        {
            id: '6',
            timeAppointment: '13:00:00'
        },
        {
            id: '7',
            timeAppointment: '14:00:00'
        },
        {
            id: '8',
            timeAppointment: '15:00:00'
        },
    ]);
    recordsCreateStore.setTime(timePickers.map((picker) => picker.timeAppointment!))
    
    const addTimePicker = () => {
        setTimePickers([
            ...timePickers,
            { id: Date.now().toString(), timeAppointment: (new Date).toLocaleTimeString()},
        ]);
    };

    const handleTimeChange = (id: string, _time: any, timeString: any) => {
        const newTimePickers =timePickers.map((picker) =>
        picker.id === id ? { ...picker, timeAppointment: timeString } : picker);
        setTimePickers(newTimePickers);
        recordsCreateStore.setTime(newTimePickers.map((picker) => picker.timeAppointment))
    }

    const removeTimePicker = (id: string) => {
        const newTimePickers = timePickers.filter((picker) => picker.id !== id);
        setTimePickers(newTimePickers)
        recordsCreateStore.setTime(newTimePickers.map((picker) => picker.timeAppointment))
    }

    return (
        <>
            <div className="flex justify-end mb-5">
                <Button type="primary" onClick={addTimePicker}>Добавить время</Button>
            </div>
            <div style={{marginBottom: 10, display: 'grid', alignItems: 'center', gridTemplateColumns: '1fr 1fr', gap: '1px', paddingLeft: '11%', paddingRight: '11%'}}>
                {timePickers.map((picker) => (
                    <div key={picker.id} 
                        style={{ marginBottom: 10, display: 'flex', alignItems: 'center'}}>
                            <TimePicker 
                            needConfirm
                            format={format}
                            value={dayjs(picker.timeAppointment, format)}
                            locale={locale}
                            placeholder="Выберете время"
                            onChange={(time, timeString) => handleTimeChange(picker.id, time, timeString)}
                            />
                            <Button type="text"
                            icon={<CloseOutlined />}
                            onClick={() => removeTimePicker(picker.id)}
                            style={{marginLeft: 10}} 
                        />
                    </div> 
                ))}
            </div>
        </>
    )
}

export default TimePickerForRecord