import { Button, Form, Input, Modal } from "antd";
import 'antd/dist/reset.css';
import { useState } from "react";
import { EditOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { updateDoctor } from "../../../features/Doctor/updateDoctor/services/updateDoctor";
import { Doctor } from "../../../entities/Doctor/model/type/doctor";

interface UpdateProfile {
    doctorProfile: Doctor;
    onUpdateDoctor: (updateDoctor: Doctor) => void
}

const ModalEditDoctor  : React.FC<UpdateProfile> = ({doctorProfile, onUpdateDoctor}) => {

    const [formDoctor] = Form.useForm();
    const [doctor, setDoctor] = useState<Doctor>({
        id: doctorProfile.id, 
        fullName: doctorProfile.fullName, 
        specialization: doctorProfile.specialization, 
        description: doctorProfile.description, 
        key: doctorProfile.key
    });
            
        const [open, setOpen] = useState(false);

        const showModal = () => {
            setOpen(true);
        };

        const handleOkAddSchedule = async () => {
            try{
                await formDoctor.validateFields();
                const fetchData = async () => {
                    await updateDoctor(doctor)
                    onUpdateDoctor(doctor);
                }
                setOpen(false)
                fetchData();
            } catch {
                console.log("error")
            }
        };

        const handleCancelAddSchedule = () => {
            setOpen(false);
        };
        const [modalText] = useState('');

        const handleChangeSpecialization = (e: any) => {
            setDoctor({ ...doctor, specialization: e.target.value})
        }

        const handleChangeDescription = (e: any) => {
            setDoctor({ ...doctor, description:e.target.value})
        }
    
    return (
        <div>
            <Button icon={<EditOutlined/>} onClick={showModal}></Button>
                <Modal title={<div style={{fontSize: '24px'}}>Редактирование профиля</div>}
                            style={{}}
                            open={open}
                            onOk={handleOkAddSchedule}
                            onCancel={handleCancelAddSchedule}
                            cancelText="Отмена"
                            okText="Добавить"
                            width={1000} >
                        <p>{modalText}</p>
                        <Form form={formDoctor} layout="vertical">
                            <Form.Item name='doctorProfile.specialization' initialValue={doctorProfile.specialization} label='Специализация'>
                                <Input name='doctorProfile.specialization' value={doctorProfile.specialization} onChange={handleChangeSpecialization}></Input>
                            </Form.Item>
                            <Form.Item name='doctorProfile.description' initialValue={doctorProfile.description} label='Описание'>
                                <TextArea name='doctorProfile.description' value={doctorProfile.description} onChange={handleChangeDescription}></TextArea>
                            </Form.Item>
                        </Form>
                </Modal>
        </div>
    );
}
export default ModalEditDoctor;