import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import { fetchDoctors } from "../../features/Doctor/getDoctors/services/fetchDoctors";
import { observer } from "mobx-react-lite";
import recordsCreateStore from "../../entities/Record/model/store/recordsCreateStore";
import { Doctor } from "../../entities/Doctor/model/type/doctor";
import doctorViewStore from "../../entities/Doctor/model/store/doctorViewStore";

const SelectDoctors = observer(() => {

const { Option } = Select;
const [doctors, setDoctors] = useState([])

useEffect(() => {
    const fetchData = async () => {
    var response = await fetchDoctors();
    var doctorsDb = response.map((doctor: Doctor, index: React.Key) => ({
        key: index,
        id: doctor.id,
        fullName: doctor.fullName,
        specialization: doctor.specialization,
    }))
    setDoctors(doctorsDb)
    }
    fetchData();
}, [])

const handleChange = (doctorId: string) => {
    recordsCreateStore.setDoctorId(doctorId);
    doctorViewStore.setId(doctorId);
}

    return (
            <Form.Item name='doctor' rules={[{ required: true, message: 'Пожалуйста, выберете врача!' }]}>
                <Select allowClear style={{ width: '100%' }} placeholder = "Сотрудники" onChange={handleChange} optionLabelProp="label">
                    {doctors.map((doctor: Doctor) => (                    
                    <Option 
                        key={doctor.id} 
                        value={doctor.id}
                        label={`${doctor.fullName} (${doctor.specialization})`}>
                                {doctor.fullName} ({doctor.specialization}) 
                    </Option>))}
                </Select>
            </Form.Item>
    );
})

export default SelectDoctors;