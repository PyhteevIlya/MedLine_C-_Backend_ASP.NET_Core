import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { fetchPersons89Department } from "../../../features/Person/getPersons89Department/fetchPersons89Department";
import { User } from "../../../entities/User/model/types/user";
import { addDoctor } from "../../../features/Doctor/addDoctor/services/addDoctor";
import './ModalAddDoctor.scss'

const { TextArea } = Input;

const ModalAddDoctor = () => {

  const [persons89Department, setPersons89] = useState<Array<User>>([])
  const [selectAddDoctor, setSelectDoctor] = useState<string>()
  
  useEffect(() => {
      const fetchData = async () => {
      var response = await fetchPersons89Department();
      var persons89 = response.map((persons: User) => ({
          value: persons.fullName,
          id: persons.id,
          persons: persons,
      }))
      setPersons89(persons89)
      }
      fetchData();
  }, [])

  const handleChange = (_userName: any, selectPerson: any) => {
    setSelectDoctor(selectPerson.id)

}
  const [openAddDoc, setOpenAddDoc] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText] = useState('');
  const [form] = Form.useForm();

        const showModalAddDoctor = () => {
            setOpenAddDoc(true);
        };

        const handleOkAddDoctor = async () => {
            try {
                const values = await form.validateFields();
                    const fetchData = async () => {
                      const doctorAddModal = {
                        id: selectAddDoctor,
                        fullName: values.fullName,
                        specialization: values.specialization,
                        description: values.description,
                        isAdmin: true,
                    }
                    setConfirmLoading(true);
                    await addDoctor(doctorAddModal);
                    setPersons89(persons89Department.filter(p => p.id !== doctorAddModal.id))
                    setConfirmLoading(false);
                    setOpenAddDoc(false);
                    }
                    fetchData();
                    form.resetFields();
            } catch {
                console.log("Ошибка")
            }
        };

        const handleCancelAddDoctor = () => {
            form.resetFields();
            setOpenAddDoc(false);
        };

    return(
<>
      <Button className="addDoctorBtn" type="primary" onClick={showModalAddDoctor}>Добавить сотрудника</Button>            
      <Modal title={<div style={{fontSize: '24px'}}>Добавление сотрудника</div>}
                      style={{}}
                      open={openAddDoc}
                      onOk={handleOkAddDoctor}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancelAddDoctor}
                      cancelText="Отмена"
                      okText="Добавить"
                      width={1000} >
                  <p>{modalText}</p>
            <Form form={form} layout="vertical">
            <div className="m-4">
              <Form.Item name="fullName" label="Полное имя сотрудника" rules={[{ required: true, message: 'Пожалуйста, введите имя врача!'}]}>
                <Select allowClear style={{ width: '100%' }} placeholder = "ФИО" optionLabelProp="label" onSelect={handleChange} options={persons89Department}>
                </Select>
              </Form.Item>
              <Form.Item name="specialization" label="Специальность" rules={[{ required: true, message: 'Пожалуйста, введите спепциальность врача!'}]}>
                <Input placeholder="Введите специализацию"className="m-2"/>
              </Form.Item>
              <Form.Item name="description" label="Описание">
                <TextArea rows={4} placeholder="Введите описание" className="m-2"/>
              </Form.Item>
            </div>
            </Form>
      </Modal>
      </>
    );
} 
export default ModalAddDoctor