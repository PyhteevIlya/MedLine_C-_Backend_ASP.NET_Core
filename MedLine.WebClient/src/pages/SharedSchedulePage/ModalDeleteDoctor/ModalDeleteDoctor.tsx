import { Button, Form, Modal } from "antd";
import { useState } from "react";
import SelectDoctors from "../../../widgets/SelectDoctors/SelectDoctors";
import doctorViewStore from "../../../entities/Doctor/model/store/doctorViewStore";
import { observer } from "mobx-react-lite";
import recordViewStore from "../../../entities/Record/model/store/recordViewStore";

const ModalDeleteDoctor = observer(() => {

    const { getAllRecordsWithNameAction } = recordViewStore

    const [open, setOpen] = useState(false);

        const [confirmLoading, setConfirmLoading] = useState(false);
        
        const [modalText] = useState('');

        const showModal = () => {
            setOpen(true);
        };

        const [formSchedule] = Form.useForm();
        const handleOkDeleteDoctor = async () => {
            try{
                const fetchData = async () => {
                    setConfirmLoading(true)
                    await formSchedule.validateFields();
                    doctorViewStore.deleteDoctorAction(doctorViewStore.id)
                    await getAllRecordsWithNameAction()
                    formSchedule.resetFields()
                    setConfirmLoading(false)
                    setOpen(false)

                }
                fetchData();
            } catch {
                console.log("error")
            }
        };
        const handleCancelDeleteDoctor = () => {
            formSchedule.resetFields()
            setOpen(false);
        };


    return (
        <>
        <Button onClick={showModal} type='text' danger>Удалить cотрудника</Button>
            <Modal title={<div style={{fontSize: '24px'}}>Удаление сотрудника</div>}
                            style={{}}
                            open={open}
                            onOk={handleOkDeleteDoctor}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancelDeleteDoctor}
                            cancelText="Отмена"
                            okText="Удалить"
                            width={1000} >
                        <p>{modalText}</p>
                        <Form form={formSchedule} layout="vertical">
                            <Form.Item name={'doctor'}>
                                <SelectDoctors/>
                            </Form.Item>
                        </Form>
            </Modal>
        </>
    )
})

export default ModalDeleteDoctor