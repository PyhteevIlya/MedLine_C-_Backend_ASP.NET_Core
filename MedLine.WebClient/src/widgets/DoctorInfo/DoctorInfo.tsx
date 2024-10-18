import { Image, Skeleton } from 'antd';
import './DoctorInfo.scss';

interface DataDoctor
{
    id: string,
    fullName: string;
    specialization: string;
    description?: string;
}


const AppointmentInfo : React.FC<DataDoctor> = ({id, fullName, specialization, description}) => {

const imgUrl = `https://phones.novator.ru/Photo/${id}?withEmpty=false&amp;official=true`

    return (
            <div className='pageContainer mb-12 p-6 shadow-[0_0px_20px_10px_rgba(34,60,80,0.2)] bg-white rounded-md' >
                <div className='sectFirstDI'>
                    <div className='divFirstDI' >
                        <Image src={imgUrl} alt="desc" style={{height: 300 }} preview={false}
                        placeholder=
                        {
                            <Skeleton.Avatar active={true}  style={{width:300, height: 300}} shape="square"/>
                        } 
                        fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg1OC41IDc2My42YTM3NCAzNzQgMCAwMC04MC42LTExOS41IDM3NS42MyAzNzUuNjMgMCAwMC0xMTkuNS04MC42Yy0uNC0uMi0uOC0uMy0xLjItLjVDNzE5LjUgNTE4IDc2MCA0NDQuNyA3NjAgMzYyYzAtMTM3LTExMS0yNDgtMjQ4LTI0OFMyNjQgMjI1IDI2NCAzNjJjMCA4Mi43IDQwLjUgMTU2IDEwMi44IDIwMS4xLS40LjItLjguMy0xLjIuNS00NC44IDE4LjktODUgNDYtMTE5LjUgODAuNmEzNzUuNjMgMzc1LjYzIDAgMDAtODAuNiAxMTkuNUEzNzEuNyAzNzEuNyAwIDAwMTM2IDkwMS44YTggOCAwIDAwOCA4LjJoNjBjNC40IDAgNy45LTMuNSA4LTcuOCAyLTc3LjIgMzMtMTQ5LjUgODcuOC0yMDQuMyA1Ni43LTU2LjcgMTMyLTg3LjkgMjEyLjItODcuOXMxNTUuNSAzMS4yIDIxMi4yIDg3LjlDNzc5IDc1Mi43IDgxMCA4MjUgODEyIDkwMi4yYy4xIDQuNCAzLjYgNy44IDggNy44aDYwYTggOCAwIDAwOC04LjJjLTEtNDcuOC0xMC45LTk0LjMtMjkuNS0xMzguMnpNNTEyIDUzNGMtNDUuOSAwLTg5LjEtMTcuOS0xMjEuNi01MC40UzM0MCA0MDcuOSAzNDAgMzYyYzAtNDUuOSAxNy45LTg5LjEgNTAuNC0xMjEuNlM0NjYuMSAxOTAgNTEyIDE5MHM4OS4xIDE3LjkgMTIxLjYgNTAuNFM2ODQgMzE2LjEgNjg0IDM2MmMwIDQ1LjktMTcuOSA4OS4xLTUwLjQgMTIxLjZTNTU3LjkgNTM0IDUxMiA1MzR6IiAvPjwvc3ZnPg=="
                        />
                    </div>
                    <div className='divSecondDI'>
                        <div>
                            <h1 className='doctorNameDI'>
                                {fullName}
                            </h1>
                        </div>
                        <div>
                            <p className='doctorSpecializationDI'>
                                {specialization}
                            </p>
                        </div>
                        <div>
                            <h2 className="doctorDescription">Описание:</h2>
                            <p className="doctorDescription">{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default AppointmentInfo