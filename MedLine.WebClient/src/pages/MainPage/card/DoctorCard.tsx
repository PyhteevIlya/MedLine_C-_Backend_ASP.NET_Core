import { FC } from "react";
import "./DoctorCard.scss";
import { useNavigate } from "react-router-dom";
import { Image, Skeleton } from "antd";

interface DoctorCardProps {
    id: string;
    fullName?: string; 
    specialization: string;
}

const DoctorCard : FC<DoctorCardProps> = ({ id, fullName, specialization}) => {

    const navigate = useNavigate()

    function routeAppointment () {
        navigate(`/doctor/${id}/${fullName}/${specialization}`)
    }

    const imgUrl = `https://phones.novator.ru/Photo/${id}?withEmpty=false&amp;official=true`
    if(id == null){
    }
    
    return (
            <div className="doctor-card" key={id}>
                <div className="doctor-card__doctor-info doctor-info">
                    <div className=" doctor-info__img">
                        {/* <Avatar  shape="square" size={200} icon={<UserOutlined/>} /> */}
                        <Image src={imgUrl} alt="photo" width={180} preview={false} style={{borderRadius: 20}}
                        placeholder=
                        {
                            <Skeleton.Avatar active={true}  style={{width:180, height: 250, borderRadius: 20}} shape="square"/>
                        } 
                        fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg1OC41IDc2My42YTM3NCAzNzQgMCAwMC04MC42LTExOS41IDM3NS42MyAzNzUuNjMgMCAwMC0xMTkuNS04MC42Yy0uNC0uMi0uOC0uMy0xLjItLjVDNzE5LjUgNTE4IDc2MCA0NDQuNyA3NjAgMzYyYzAtMTM3LTExMS0yNDgtMjQ4LTI0OFMyNjQgMjI1IDI2NCAzNjJjMCA4Mi43IDQwLjUgMTU2IDEwMi44IDIwMS4xLS40LjItLjguMy0xLjIuNS00NC44IDE4LjktODUgNDYtMTE5LjUgODAuNmEzNzUuNjMgMzc1LjYzIDAgMDAtODAuNiAxMTkuNUEzNzEuNyAzNzEuNyAwIDAwMTM2IDkwMS44YTggOCAwIDAwOCA4LjJoNjBjNC40IDAgNy45LTMuNSA4LTcuOCAyLTc3LjIgMzMtMTQ5LjUgODcuOC0yMDQuMyA1Ni43LTU2LjcgMTMyLTg3LjkgMjEyLjItODcuOXMxNTUuNSAzMS4yIDIxMi4yIDg3LjlDNzc5IDc1Mi43IDgxMCA4MjUgODEyIDkwMi4yYy4xIDQuNCAzLjYgNy44IDggNy44aDYwYTggOCAwIDAwOC04LjJjLTEtNDcuOC0xMC45LTk0LjMtMjkuNS0xMzguMnpNNTEyIDUzNGMtNDUuOSAwLTg5LjEtMTcuOS0xMjEuNi01MC40UzM0MCA0MDcuOSAzNDAgMzYyYzAtNDUuOSAxNy45LTg5LjEgNTAuNC0xMjEuNlM0NjYuMSAxOTAgNTEyIDE5MHM4OS4xIDE3LjkgMTIxLjYgNTAuNFM2ODQgMzE2LjEgNjg0IDM2MmMwIDQ1LjktMTcuOSA4OS4xLTUwLjQgMTIxLjZTNTU3LjkgNTM0IDUxMiA1MzR6IiAvPjwvc3ZnPg=="
                        />
                    </div>
                    <div className="doctor-info__text">
                        <h3 className="max-w-full font-bold text-lg text-center">
                            {fullName}
                        </h3>
                        <p className="text-center text-base">
                            {specialization} 
                        </p>
                    </div>
                    <div className="doctor-info__button button_div">
                        <button onClick={routeAppointment} className="button-div__button w-full h-full font-normal text-base">
                            Записаться
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default DoctorCard