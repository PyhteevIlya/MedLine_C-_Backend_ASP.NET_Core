import { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space, message } from 'antd';
import { createPatient } from '../../../features/Patient/createPatient/services/createPatient';
import { updateRecord } from '../../../features/Record/updateRecord/services/updateRecord';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRecordsById } from '../../../features/Record/getRecordAppointmentById/services/fetchRecordById';
import { delay } from 'framer-motion';
import { Patient } from '../../../entities/Patient/model/type/patient';
import { observer } from 'mobx-react-lite';
import rootStore from '../../../app/StoreProvider/rootStore/rootStore';
import { fetchPersonsAutoComplete } from '../../../features/Person/getAllPersons/fetchPersonsAutoComplete';
import { RoleEnum, User } from '../../../entities/User/model/types/user';
import { Status } from '../../../entities/Record/model/type/record';
import { RouteNames } from '../../../app/router';
import './InputElement.scss'
import menuStore from '../../../app/StoreProvider/menuStore/menuStore';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const InputElement = observer(() => {

  const params = useParams();

  const [record, setRecord] = useState({
    id: 'dg',
    key: '12321',
    dateAppointment: '0000-00-00', 
    timeAppointment: '00:00:00', 
    typeAppointment: '-', 
    roomNumber: '-', 
    isReserved: false, 
    patientId: '-', 
    doctorId: '-', 
    description: '-',
    status: 0,
    patientFullName: '-',
    doctorFullName: '-'
  });
  useEffect(() => {
    const fetchData = async () => {
    var record = await fetchRecordsById(params);
    setRecord(record)
    }
    fetchData();
  }, [])

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = () => {
    messageApi.open({
      type: 'success',
      content: 'Вы записаны',
    })
  } 

  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: 'Упс, что то пошло не так!(',
    })
  } 

  
  const onFinish = (patientForm: Patient) => {
      const fetchData = async () => {
        const patient: Patient =  {}
        patient.id = rootStore.User?.id
        patient.fullName = rootStore.User?.fullName
        patient.tabelNumber = rootStore.User?.tabelNumber
        patient.orgUnit = rootStore.User?.orgUnit
        patient.jobRole = rootStore.User?.jobRole
        patient.jobPhone = patientForm.jobPhone
        patient.personalPhone = patientForm.personalPhone
        patient.programMedicalPolicy = patientForm.programMedicalPolicy
      var patientId = await createPatient(patient);
      await updateRecAppoint(patientId);
      }
      fetchData();
  };

  const updateRecAppoint = async (_patientId: string) => {

    record.patientId = rootStore.User?.id;
    record.isReserved = true;
    record.status = Status.Ожидание;

    try{
    var recordId = await updateRecord(params.recordid, record)
    if(recordId?.status === 200 || recordId?.status === 201)
    {
        successMessage();
        delay(route, 1000)
    }
    else {
      errorMessage()
    }
    } catch(error) {
        errorMessage();
    } 
  }

  const onReset = () => {
    form.resetFields();
  };

  const navigate = useNavigate()

    function route () {
        navigate(RouteNames.MYRECORDS)
        menuStore.setSelectedKey('appointment')
    }

    const [persons, setPatient] = useState<Array<Patient>>();
    const [person, setPerson] = useState({
      id: rootStore.User?.id,
      fullName: rootStore.User?.fullName,
      personalPhone: rootStore.User?.personalPhone,
      tabelNumber: rootStore.User?.tabelNumber,
      orgUnit: rootStore.User?.orgUnit,
      jobRole: rootStore.User?.jobRole,
      role: rootStore.User?.role,
      programMedicalPolicy: '',
      jobPhone: ''
    });
    
    let timeOutId: any = null;

    const fetchSuggestions = async (searchString: any) => {
      try {
        const response = await fetchPersonsAutoComplete(searchString);

        const formattedOptions = response.map((person: User) => ({
          value: person.fullName,
          person,
        }))
        setPatient(formattedOptions)
      } catch(error){
        console.log(error)
      }
    }
    const handleSearch = (searchString: string) => {
      clearTimeout(timeOutId);
        if(searchString.length >= 2) {
          timeOutId = setTimeout(() => fetchSuggestions(searchString), 300)
        } else {
        }
    }
    const handleUserSelect = (_userName: any, selectPerson: any) => {
      const { person } = selectPerson
      setPerson({ ...person})
    }

    const phoneRegEx = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/; 
    const jobPhoneRegEx = /^\d{2}-\d{2}$/
    const numberMedicalPolicy = /^\d{16}$/

    const validatePersonalPhoneRule = {
      pattern: phoneRegEx,
      message:'Неверный формат',
    } 

    const validateJobPhone = {
      pattern: jobPhoneRegEx,
      message: 'Формат номера: 00-00'
    }
    const validateNumberMedicalPolicy = {
      pattern: numberMedicalPolicy,
      message: 'Номер должен состоять из 16 цифр'
    }

  return (
    <>
    {contextHolder}
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
        {rootStore.User.role !== RoleEnum.Пользователь
          ?   <Form.Item rules={[{ required: true }]}>
                <Select placeholder='ФИО' defaultValue={person.fullName} showSearch onSearch={handleSearch} onSelect={handleUserSelect} optionFilterProp="label" filterOption={false} options={persons}/>
              </Form.Item>

          :   <Form.Item rules={[{ required: true }]}>
                <Select placeholder='ФИО' disabled defaultValue={person.fullName} showSearch onSearch={handleSearch} onSelect={handleUserSelect} optionFilterProp="label" filterOption={false} options={persons}/>
              </Form.Item>
        }
      <Form.Item  rules={[{ required: true }]} >
        <Input placeholder='Табельный номер' value={person.tabelNumber} name='tabelNumber' readOnly={true}></Input>
      </Form.Item>
      <Form.Item rules={[{ required: true }]}>
        <Input placeholder='Штатная единица' value={person.orgUnit} name='orgUnit' readOnly={true}></Input>
      </Form.Item>
      <Form.Item  rules={[{ required: true}]}>
        <Input placeholder='Должность' value={person.jobRole} name='jobRole' readOnly={true}></Input>
      </Form.Item>
      <Form.Item rules={[{ required: true, message: "Пожалуйста, добавте номер телефона" }, validatePersonalPhoneRule]} name='personalPhone'>
        <Input placeholder='Персональный телефон: +795....' value={person.personalPhone} name='personalPhone'/>
      </Form.Item>
      <Form.Item rules={[{ required: false }, validateJobPhone]} name="jobPhone">
        <Input placeholder='Служебный телефон: 00-00' value={person.jobPhone} name="jobPhone" />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: "Пожалуйста, добавте полис"  }, validateNumberMedicalPolicy]} name="programMedicalPolicy">
        <Input placeholder='Полис' value={person.programMedicalPolicy} name="programMedicalPolicy" ></Input>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space className='pt-2'>
          <Button type="primary" htmlType="submit" className='button'>
            Записаться
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Очистить
          </Button>
        </Space>
      </Form.Item>
    </Form>
    </>
  );
});

export default InputElement;