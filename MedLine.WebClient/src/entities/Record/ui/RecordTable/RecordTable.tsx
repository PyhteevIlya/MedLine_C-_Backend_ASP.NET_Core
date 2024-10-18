import { ConfigProvider, Empty, Table, TableColumnsType } from "antd";
import RecordViewStore from "../../model/store/recordViewStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Record } from "../../model/type/record";
import ModalPatientInfo from "../../../../widgets/ModalPatientInfo/ModalPatientInfo";
import ru_Ru from 'antd/es/locale/ru_RU'
import dayjs from 'dayjs'

export const RecordTable = observer(() => {
    const { getAllRecordsWithNameAction, record } = RecordViewStore

    const [ doctorNames, setFilterDoctorName ] = useState([
        {
            text: 'Иванов',
            value: 'Иванов'
        }]);

        useEffect(() => {
            const fetchData = async () => {
            await getAllRecordsWithNameAction();
            const uniquename = RecordViewStore.record!.map(item => item.doctorFullName).filter((value, index, self) => self.indexOf(value) === index)
            setFilterDoctorName(uniquename.map((record: any)=>({
                text: record,
                value: record
            })))
        }
        fetchData();
        }, [])



        const deleteRecord = (id: string) => {
            RecordViewStore.deleteRecord(id)
        }

        const columns: TableColumnsType<Record> = [
            {
                title: 'Сотрудники',
                width: 120,
                key: 'doctorFullName',
                dataIndex: 'doctorFullName',
                fixed: 'left',
                align: "center",
                showSorterTooltip: { target: 'full-header'},
                filters: doctorNames,
                    onFilter: (value, record) => record.doctorFullName.indexOf(value as string) === 0,
            },
            
            {
                title: 'Дата',
                width: 40,
                key: 'dateAppointment',
                dataIndex: 'dateAppointment',
                align: "center",
                sorter: (a, b) => { 
                    const dateA = dayjs(a.dateAppointment, 'DD.MM.YYYY');
                    const dateB = dayjs(b.dateAppointment, 'DD.MM.YYYY');
                    return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0; 
                    },
                render: (text) => <p>{text}</p>,
            },
            {
                title: 'Время',
                width: 40,
                key: 'timeAppointment',
                dataIndex: 'timeAppointment',
                align: "center",
                render: (text) => <p>{text}</p>,
            },
            {
                title: 'Пациент',
                width: 120,
                key: 'patientFullName',
                dataIndex: 'patientFullName',
                align: "center",
                render: (_text:string, record: Record) => 
                <div><ModalPatientInfo patientId={record.patientId} patientFullName={record.patientFullName}/></div>
            },
            {
                title: 'Статус записи',
                width: 50,
                key: 'status',
                dataIndex: 'status',
                align: "center",
                render: (text) => <p>{text}</p>
            },
            {
                title: 'Расписание',
                width: 60,
                dataIndex: 'action',
                key: 'action',
                align: "center",
                render: (_text:string, record: Record) => 
                    <div><a onClick={() => deleteRecord(record.id)}>Удалить</a> 
                    </div>
            },
        ];

        return (
            <>
                <ConfigProvider locale={ru_Ru} theme={{
                    components: {
                    Table: {
                        headerBg: '#61a7f8',
                        headerColor: '#ffffff',
                        algorithm: true, // Enable algorithm
                        headerSortActiveBg: '#61a7f8',
                        headerSortHoverBg: '#61a7f8',
                    },
                    }
                }
                } renderEmpty={() => <Empty description='Пока ничего нет'/>}>
                        <Table columns={columns} dataSource={record}  scroll={{ x: 1300 }}/>
                </ConfigProvider>
            </>
        )
})