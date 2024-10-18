import { Route, Routes } from "react-router-dom";
import { adminRoutes, doctorRoutes, publicRoutes } from "../router";
import rootStore from "../StoreProvider/rootStore/rootStore";
import { RoleEnum } from "../../entities/User/model/types/user";

const AppRouter =() => {

    if (rootStore.User.role == RoleEnum.Разработчик || rootStore.User.role == RoleEnum.Администратор) {
        return (
            <Routes>
                {adminRoutes.map( route => 
                    <Route path={route.path} Component={route.component} key={route.path}/>
                )}
            </Routes>
        )
    }
    else if (rootStore.User.role == RoleEnum.Врач) {
        return (
            <Routes>
                {doctorRoutes.map( route =>
                    <Route path={route.path} Component={route.component} key={route.path}/>
                )}
        </Routes>
        )
    }
    else {
        return (
            <Routes>
                {publicRoutes.map( route =>
                    <Route path={route.path} Component={route.component} key={route.path}/>
                )}
            </Routes>
        )
    }
}

export default AppRouter 