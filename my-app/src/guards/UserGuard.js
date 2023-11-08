import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../services/utility';


export const AuthGuard = ({
    children,
}) => {
    const user = getUser();

    if (!user) {
        return <Navigate to='/login' />;
    }

    return children ? children : <Outlet />;

};