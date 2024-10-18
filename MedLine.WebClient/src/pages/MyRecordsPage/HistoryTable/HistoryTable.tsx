import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Modal, Result, Space, Spin, Table, TableColumnsType, message } from 'antd';
import rootStore from '../../../app/StoreProvider/rootStore/rootStore';
import { Record, Status } from '../../../entities/Record/model/type/record';
import { fetchRecordsByPatientId } from '../../../features/Record/getRecordsByPatientId/services/fetchRecordsByPatientId';
import { cancelingRecord } from '../../../features/Record/updateRecord/services/cancelingRecord';
import { ReconciliationTwoTone } from '@ant-design/icons'
import { delay } from 'framer-motion';

const HistoryTable  = () => {

  const [loading, setLoading] = useState<boolean>(true)

  const [record, setRecord] = useState<Array<Record>>();
  useEffect(() => {
    const fetchData = async () => {
    var response = await fetchRecordsByPatientId(rootStore.User?.id);
    setRecord(response?.data.map((record: Record, index: React.Key) => ({
      key: index,
      id: record.id,
      dateAppointment: record.dateAppointment,
      timeAppointment: record.timeAppointment,
      roomNumber: record.roomNumber,
      isReserved: record.isReserved,
      patientId: record.patientId,
      doctorId: record.doctorId,
      status: Status[record.status],
      doctorFullName: record.doctorFullName
  })))
  }
  setLoading(false)
  fetchData();
}, [])

const columns: TableColumnsType<Record> = [
  {
      title: 'Врач',
      width: 120,
      key: 'doctorFullName',
      dataIndex: 'doctorFullName',
      align: 'center',
      fixed: 'left',
  },
  {
    title: 'Номер кабинета',
    width: 10,
    key: 'roomNumber',
    dataIndex: 'roomNumber',
    align: 'center',
    render: (text) => <p>{text}</p>,
  },
  {
      title: 'Дата',
      width: 40,
      key: 'dateAppointment',
      dataIndex: 'dateAppointment',
      align: 'center',
      render: (text) => <p>{text}</p>,
  },
  {
      title: 'Время',
      width: 40,
      key: 'timeAppointment',
      dataIndex: 'timeAppointment',
      align: 'center',
      render: (text) => <p>{text}</p>,
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
      title: 'Действие',
      width: 60,
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_text:string, record: Record) => 
        <Space size="middle">
        <Button type="link" onClick={() => showModal(record)}>
        Отменить
        </Button>
        <Modal title=" " open={isModalOpen} onOk={handleOk} okText='Да' cancelText='Отмена' onCancel={handleCancel}>
            <p>Вы уверенны, что хотите отменить запись?</p>
        </Modal>
      </Space>
  },
];
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = () => {
    messageApi.success('Запись отменена!')
  } 

  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: 'Упс, что то пошло не так!(',
    })
  } 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectRecord, setSelectRecord] = useState<Record>();

  const showModal = (record: Record) => {
      setSelectRecord(record)
      setIsModalOpen(true);
  };

  const handleOk = async () => {
    try{
    var recordId = await cancelingRecord(selectRecord?.id)
    if(recordId?.status === 200 || recordId?.status === 201)
    {
      successMessage();
      setIsModalOpen(false);
      delay(updateTable, 2000)
    }
    } catch(error) {
      errorMessage();
    } 
  };
  function updateTable (){
    setRecord(record?.filter(r => r.id != selectRecord?.id))
  }

  const handleCancel = () => {
      setIsModalOpen(false);
  };
  if(loading) {
    return (
      <Spin spinning={loading} fullscreen></Spin>
    )
  }
  if (record?.length == 0){
    return <><Result icon={<ReconciliationTwoTone/>} title="Кажется у Вас пока нет записей"></Result></>
  }
    return (
      <>
        {contextHolder}
      <ConfigProvider theme={{
        components: {
          Table: {
            headerBg: '#61a7f8',
            headerColor: '#ffffff',
            algorithm: true, // Enable algorithm
          },
        }
      }
      }>
        
        <Table dataSource={record} columns={columns}/>
      </ConfigProvider>
      </>
    )
};

export default HistoryTable;