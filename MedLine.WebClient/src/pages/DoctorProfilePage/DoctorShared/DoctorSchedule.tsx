import { ConfigProvider, Empty, Table, TableColumnsType } from 'antd';
import { useEffect, useState } from 'react';
import { Record } from "../../../entities/Record/model/type/record";
import rootStore from '../../../app/StoreProvider/rootStore/rootStore';
import ModalPatientInfo from '../../../widgets/ModalPatientInfo/ModalPatientInfo';
import recordViewStore from '../../../entities/Record/model/store/recordViewStore';
import { observer } from 'mobx-react-lite';
import ru_Ru from 'antd/es/locale/ru_RU'

const DoctorSchedule = observer(() => {
    //const [records, setRecords] = useState<Array<Record>>();

    useEffect(() => {
        const fetchData = async () => {
        await recordViewStore.getRecordsByDoctorIdWithPatientName(rootStore.User)
        //var response = await fetchRecordsWithPatientName(rootStore.User);
        //setRecords(recordViewStore.recordForDoctorProfile)
            const uniqueDate = recordViewStore.recordForDoctorProfile!.map(item => item.dateAppointment).filter((value, index, self) => self.indexOf(value) === index)
            setFilterDoctorName(uniqueDate.map((date: any)=>({
                text: date,
                value: date
            })))
        }
        fetchData();
    }, [])

        const deleteRecord = (id: string) => {
            const fetchData = async () => {
                // var response = await deleteRecordAppointment(id);
                // setRecords(records!.filter((record => record.id !== response?.data)))
                await recordViewStore.deleteRecord(id)
                await recordViewStore.getRecordsByDoctorIdWithPatientName(rootStore.User)
            }
                fetchData();
        }

        const [ dateFilter, setFilterDoctorName ] = useState([
            {
                text: '01.01.2024',
                value: '01.01.2024'
            }]);
        
    const columns: TableColumnsType<Record> = [
        {
            title: 'Дата',
            width: 40,
            key: 'dateAppointment',
            dataIndex: 'dateAppointment',
            align: 'center',
            render: (text) => <p>{text}</p>,
            filters: dateFilter,
            onFilter: (value, record) => {
                return record.dateAppointment.indexOf(value as string) === 0;
            }
        },
        {
            title: 'Время',
            width: 40,
            key: 'timeAppointment',
            align: 'center',
            dataIndex: 'timeAppointment',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Пациент',
            width: 60,
            key: 'patientFullName',
            dataIndex: 'patientFullName',
            align: 'center',
            render: (_text:string, record: Record) => 
            <div><ModalPatientInfo patientId={record.patientId} patientFullName={record.patientFullName}/></div>
        },
        {
            title: 'Статус записи',
            width: 50,
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (text) => <p>{text}</p>
        },
        {
            title: 'Расписание',
            width: 60,
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_text:string, record: Record) => 
                <div><a onClick={() => deleteRecord(record.id)}>Удалить</a> 
                </div>
        },
    ];

    return (
        <div className='pageContainer shadow-[0_0px_20px_10px_rgba(34,60,80,0.2)] bg-white rounded-md'>
            <ConfigProvider locale={ru_Ru} theme={{
                components: {
                Table: {
                    headerBg: '#61a7f8',
                    headerColor: '#ffffff',
                    algorithm: true, // Enable algorithm
                },
                }
            }
            } renderEmpty={() => <Empty description='Нет записей'/>}>
                    <Table columns={columns} dataSource={recordViewStore.recordForDoctorProfile}/>
            </ConfigProvider>
        </div>
    )
});

export default DoctorSchedule;