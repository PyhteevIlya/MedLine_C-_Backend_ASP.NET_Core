import { Button, Form, Input, Modal } from "antd";
import 'antd/dist/reset.css';
import './ModalAddSchedule.scss';
import SelectDoctors from "../../widgets/SelectDoctors/SelectDoctors";
import DatePickerForRecord from "./datePickerForRecord/DatePickerForRecord";
import TimePickerForRecord from "./timePickerForRecord/TimePickerForRecord";
import recordsCreateStore from "../../entities/Record/model/store/recordsCreateStore";
import { observer } from "mobx-react-lite";
import recordViewStore from "../../entities/Record/model/store/recordViewStore";
import { useState } from "react";
import rootStore from "../../app/StoreProvider/rootStore/rootStore";
import { RoleEnum } from "../../entities/User/model/types/user";
import doctorViewStore from "../../entities/Doctor/model/store/doctorViewStore";

const ModalAddSchedule = observer(() => {

    const handleRoomNumberChange = (e: any) =>
    {
        recordsCreateStore.setRoom(e.target.value)
    }

    const [formSchedule] = Form.useForm();
            
        const [open, setOpen] = useState(false);

        const showModal = () => {
            setOpen(true);
        };

        const handleOkAddSchedule = async () => {
            try{
                await formSchedule.validateFields();
                if (rootStore.User.role == RoleEnum.Врач) {
                    recordsCreateStore.setDoctorId(rootStore.User.id);
                    doctorViewStore.setId(rootStore.User.id);
                }
                const fetchData = async () => {
                    setConfirmLoading(true)
                    await recordsCreateStore.createRecordsAction()
                    await recordViewStore.getAllRecordsWithNameAction()
                    await recordViewStore.getRecordsByDoctorIdWithPatientName(rootStore.User)
                    setConfirmLoading(false)
                    setOpen(false)
                }
                formSchedule.resetFields()
                fetchData();
            } catch {
                console.log("error")
            }
        };

        const handleCancelAddSchedule = () => {
            setOpen(false);
            formSchedule.resetFields()
        };
        const [confirmLoading, setConfirmLoading] = useState(false);
        const [modalText] = useState('');
    
    return (
        <div>
            <Button className="addScheduleBtn" onClick={showModal} type='primary'>Добавить расписание</Button>
                <Modal title={<div style={{fontSize: '24px'}}>Добавление расписания</div>}
                            style={{}}
                            open={open}
                            onOk={handleOkAddSchedule}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancelAddSchedule}
                            cancelText="Отмена"
                            okText="Добавить"
                            width={1000} >
                        <p>{modalText}</p>
                            <Form form={formSchedule} layout="vertical">
                                {rootStore.User.role == RoleEnum.Врач
                                    ?   <>
                                            <Form.Item name='doctorId' hidden> 
                                                <Input disabled value={rootStore.User.id}>
                                                </Input>
                                            </Form.Item>
                                            <Input disabled defaultValue={rootStore.User.fullName}/>
                                        </>
                                    :   <>  
                                            <h1 className="headerPicker"> Выберете сотрудника</h1>
                                            <SelectDoctors/>
                                        </>  
                                }
                                <h1 className="headerPicker">Выберите даты</h1>
                                    <DatePickerForRecord/>
                                <h1 className="headerPicker">Укажите номер кабинета</h1>
                                <Form.Item name='Room' rules={[{ required: true, message: 'Пожалуйста, укажите номер кабинета!'}]}>
                                    <Input onChange={handleRoomNumberChange}></Input>
                                </Form.Item>
                                <h1 className="headerPicker">Укажите время приема</h1>
                                    <TimePickerForRecord/>
                            </Form>
                </Modal>
        </div>
    );
})
export default ModalAddSchedule;