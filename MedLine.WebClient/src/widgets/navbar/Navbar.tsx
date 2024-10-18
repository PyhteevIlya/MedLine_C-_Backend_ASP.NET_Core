import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../app/router";
import "./Navbar.scss";
import React from "react";
import rootStore from "../../app/StoreProvider/rootStore/rootStore";
import { RoleEnum } from "../../entities/User/model/types/user";
import menuStore from "../../app/StoreProvider/menuStore/menuStore";
import { observer } from "mobx-react-lite";
import { UserOutlined, QuestionCircleOutlined } from '@ant-design/icons'

const formatName = (fullName: string) => {
    const nameParts = fullName.split(' ');

    if(nameParts.length < 2) {
        return fullName;
    }

    const [lastName, firstName, middleName] = nameParts;
    const initials = `${firstName[0]}. ${middleName ? middleName[0] + '.' : ''}`;

    return `${lastName} ${initials}`
}

const Navbar = observer(() => {
    const router = useNavigate();

    function InfoClick() {
        router(RouteNames.INFORMATIONPAGE);
        menuStore.setSelectedKey('info')
    }
    function MainClick() {
        router(RouteNames.MAIN);
        menuStore.setSelectedKey('main')
    }

    function AppointClick() {
        router(RouteNames.MYRECORDS);
        menuStore.setSelectedKey('appointment')
    }

    function DoctorProfileClick() {
        router(RouteNames.DOCTORPROFILE)
        menuStore.setSelectedKey('doctorprofile')
    }

    function SharedScheduleClick() {
        router(RouteNames.SHAREDSCHEDULE)
        menuStore.setSelectedKey('sharedschedule')
    }

    const formattedName = formatName(rootStore.User.fullName);

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3366cc',
    };
    const menuStyleLeft: React.CSSProperties = {
        backgroundColor: '#3366cc',
        flex: 1
    };

    if (rootStore.User.role == RoleEnum.Администратор || rootStore.User.role == RoleEnum.Разработчик){

    return (
            <Layout.Header style={headerStyle}>
                <Menu 
                theme="dark"
                style={menuStyleLeft}
                mode="horizontal"
                selectable={true}
                inlineIndent={0}
                selectedKeys={[menuStore.selectedKey]}
                items={[
                    {
                        key: 'info',
                        label: <a onClick={InfoClick} key={0}>Главная</a>
                    },
                    {
                        key: 'main',
                        label: <a onClick={MainClick} key={1}>Записаться на прием</a>,
                    },
                    {
                        key: 'appointment',
                        label: <a onClick={AppointClick} key={2}>Мои записи</a>,

                    },
                    {
                        key: 'doctorprofile',
                        label: <a onClick={DoctorProfileClick} key={3}>Мое расписание</a>,
                    },
                    {
                        key: 'sharedschedule',
                        label: <a onClick={SharedScheduleClick}  key={4}>График приемов</a>
                    }
                    ]}>
                </Menu>
                    <div className="mx-2 text-white" key={5}>
                                {<UserOutlined/>}
                    </div>
                    <div key={6} className="mr-4 text-white whitespace-nowrap">
                        <p>{formattedName}</p>
                    </div>
                    <div key={7} className="mx-2 text-white">
                        {<QuestionCircleOutlined/>}
                    </div>
                    <div key={8} className="text-white whitespace-nowrap">
                        <p>Техподдержка: 66-17; 66-18</p>
                    </div>
            </Layout.Header>
    );
}
else if (rootStore.User.role == RoleEnum.Врач) {
    return (
            <Layout.Header style={headerStyle}>
                <Menu 
                theme="dark"
                style={menuStyleLeft}
                mode="horizontal"
                selectable={true}
                items={[
                    {
                        key: 'info',
                        label: <a onClick={InfoClick} key={0}>Главная</a>
                    },
                    {
                        key: 'main',
                        label: <a onClick={MainClick} key={1}>Записаться на прием</a>,
                    },
                    {
                        key: 'appointment',
                        label: <a onClick={AppointClick} key={2}>Мои записи</a>,

                    },
                    {
                        key: 'doctorprofile',
                        label: <a onClick={DoctorProfileClick} key={3}>Мое расписание</a>,
                    }
                    ]}>
                </Menu>
                <div className="mx-2 text-white" key={5}>
                            {<UserOutlined/>}
                </div>
                <div key={6} className="text-white">
                    <p>{formattedName}</p>
                </div>
                <div key={7} className="mx-4 text-white">
                    {<QuestionCircleOutlined/>}
                </div>
                <div key={8} className="text-white">
                    <p>Техподдержка: 66-17; 66-18</p>
                </div>
            </Layout.Header>
    )
}
else {
    return (
            <Layout.Header style={headerStyle}>
                <Menu 
                theme="dark"
                style={menuStyleLeft}
                mode="horizontal"
                selectable={true}
                items={[
                    {
                        key: 'info',
                        label: <div onClick={InfoClick} key={0}>Главная</div>
                    },
                    {
                        key: 'main',
                        label: <div onClick={MainClick} key={1}>Записаться на прием</div>,
                    },
                    {
                        key: 'appointment',
                        label: <div onClick={AppointClick} key={2}>Мои записи</div>,
                    },
                    ]}>
                </Menu>
                <div className="mx-2 text-white" key={5}>
                            {<UserOutlined/>}
                </div>
                <div key={6} className="text-white">
                    <p>{formattedName}</p>
                </div>
                <div key={7} className="mx-4 text-white">
                    {<QuestionCircleOutlined/>}
                </div>
                <div key={8} className="text-white">
                    <p>Техподдержка: 66-17; 66-18</p>
                </div>
            </Layout.Header>
    );
}
}
)
export default Navbar