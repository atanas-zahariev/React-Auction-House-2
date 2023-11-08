import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../services/utility';


export const GuestGuard = ({
    children,
}) => {
    const user = getUser();

    if (user) {
        return <Navigate to='/catalog' />;
    }

    return children ? children : <Outlet />;

};