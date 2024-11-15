import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {ReactElement} from "react";
import {RootState} from "../../Store";

const ProtectedRoute = ({ element, showLogged }:{element:ReactElement, showLogged: boolean}) => {
    const isLoggedIn = useSelector((state: RootState) => !!state.log.userName);

    if(showLogged){
        return isLoggedIn ? element : <Navigate to="/error" replace />;
    }
    return isLoggedIn ? <Navigate to="/error" replace /> : element;

};

export default ProtectedRoute;