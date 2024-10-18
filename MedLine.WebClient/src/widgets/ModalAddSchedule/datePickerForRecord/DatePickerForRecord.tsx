import { ConfigProvider, DatePicker, DatePickerProps, Form } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { observer } from "mobx-react-lite";
import recordsCreateStore from "../../../entities/Record/model/store/recordsCreateStore";
import locale from 'antd/locale/ru_RU';

const DatePickerForRecord = observer(() => {

    const onChange: DatePickerProps<Dayjs[]>['onChange'] = (_date, dateString) => {
        recordsCreateStore.setDate(dateString)
    };
    
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        //блокировка дат меньше текущей даты и больше текущей даты на 14 дней
        return current > dayjs().add(14, 'day').startOf('day') || current < dayjs().startOf('day');
    };
    
    dayjs.extend(customParseFormat);
    
    return (
        <ConfigProvider locale={locale}>
            <Form.Item  name='Date' required rules={[{ required: true, message: 'Пожалуйста, добавте даты!'}]}>
                <DatePicker
                    className="datePicker"
                    multiple
                    onChange={onChange}
                    maxTagCount="responsive"
                    disabledDate={disabledDate}
                    />
            </Form.Item>
        </ConfigProvider>
    )
})
export default DatePickerForRecord;