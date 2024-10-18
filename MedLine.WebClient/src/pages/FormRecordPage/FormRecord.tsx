import './FormRecord.scss';
import { Breadcrumb, Button, ConfigProvider, Image } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import InputElement from './Input/InputElement';
import { CloseOutlined } from '@ant-design/icons';
import { RouteNames } from '../../app/router';

const FormRecord = () => {
    const params = useParams()

    const imgUrl = `https://phones.novator.ru/Photo/${params.id}?withEmpty=false&amp;official=true`
    
    const navigate = useNavigate()

    const CloseButton = () => {
        navigate(RouteNames.MAIN)
    }

    return (
        <>
                <div className='breadCrumb'>
                    <Breadcrumb items={[
                        {
                            title:<a href='/listofdoctors'>Записаться на прием</a>
                        },
                        {
                            title:<a href={`/doctor/${params.id}/${params.fullName}/${params.specialization}`}>{params.fullName}</a>
                        },
                        {
                            title:<a href={`/doctor/${params.id}/${params.fullName}/${params.specialization}/${params.recordId}/${params.date}/${params.time}`}>Форма записи</a>
                        }
                    ]}/>
                </div>
                <div className='w-8/12 ml-auto mr-auto mt-10 mb-12 p-6 shadow-[0_0px_20px_10px_rgba(34,60,80,0.2)] bg-white rounded-md' >
                    <ConfigProvider>
                    <div className='containerFormRecord'>
                        <div className='containerImage' >
                            {/* <Avatar  shape="square" size={300} icon={<UserOutlined/>} /> */}
                            <Image src={imgUrl} alt="desc" style={{height: 300, }} preview={false} 
                            fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg1OC41IDc2My42YTM3NCAzNzQgMCAwMC04MC42LTExOS41IDM3NS42MyAzNzUuNjMgMCAwMC0xMTkuNS04MC42Yy0uNC0uMi0uOC0uMy0xLjItLjVDNzE5LjUgNTE4IDc2MCA0NDQuNyA3NjAgMzYyYzAtMTM3LTExMS0yNDgtMjQ4LTI0OFMyNjQgMjI1IDI2NCAzNjJjMCA4Mi43IDQwLjUgMTU2IDEwMi44IDIwMS4xLS40LjItLjguMy0xLjIuNS00NC44IDE4LjktODUgNDYtMTE5LjUgODAuNmEzNzUuNjMgMzc1LjYzIDAgMDAtODAuNiAxMTkuNUEzNzEuNyAzNzEuNyAwIDAwMTM2IDkwMS44YTggOCAwIDAwOCA4LjJoNjBjNC40IDAgNy45LTMuNSA4LTcuOCAyLTc3LjIgMzMtMTQ5LjUgODcuOC0yMDQuMyA1Ni43LTU2LjcgMTMyLTg3LjkgMjEyLjItODcuOXMxNTUuNSAzMS4yIDIxMi4yIDg3LjlDNzc5IDc1Mi43IDgxMCA4MjUgODEyIDkwMi4yYy4xIDQuNCAzLjYgNy44IDggNy44aDYwYTggOCAwIDAwOC04LjJjLTEtNDcuOC0xMC45LTk0LjMtMjkuNS0xMzguMnpNNTEyIDUzNGMtNDUuOSAwLTg5LjEtMTcuOS0xMjEuNi01MC40UzM0MCA0MDcuOSAzNDAgMzYyYzAtNDUuOSAxNy45LTg5LjEgNTAuNC0xMjEuNlM0NjYuMSAxOTAgNTEyIDE5MHM4OS4xIDE3LjkgMTIxLjYgNTAuNFM2ODQgMzE2LjEgNjg0IDM2MmMwIDQ1LjktMTcuOSA4OS4xLTUwLjQgMTIxLjZTNTU3LjkgNTM0IDUxMiA1MzR6IiAvPjwvc3ZnPg=="
                            ></Image>
                        </div>
                        <div className='containerForm'>
                            <h1 className='doctorName'>
                            {params.fullName}
                            </h1>
                            <p className='doctorSpeci'>
                            {params.specialization}
                            </p>
                            <div className='dateTimeText'>
                                Выбранная дата: {params.date}
                            </div>
                            <div className='dateTimeText'>
                                Выбранное время: {params.time}
                            </div>
                            <p className='font-bold m-2'>
                                Заполните поля:
                            </p>
                            <div className='m-2.5'>
                                <InputElement></InputElement>
                            </div>
                        </div>
                        <div>
                            <Button icon={<CloseOutlined/>} onClick={CloseButton}/>
                        </div>
                    </div>
                    </ConfigProvider>
                </div>
            </>
    );
};

export default FormRecord
