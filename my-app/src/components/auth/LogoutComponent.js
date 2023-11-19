import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';

export default function Logout() {
    const { onLogout } = useContext(AuthContext);

    const { logout,dispatch } = useContext(DataContext);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await logout();
        }
        dispatch({type:'LOGOUT',user:''});
        fetchData();
        onLogout();
        navigate('/');
        // eslint-disable-next-line
    }, []);
}