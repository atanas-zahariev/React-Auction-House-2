import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

import { useApi } from '../../services/dataService';

export default function Logout() {
    const { onLogout } = useContext(AuthContext);

    const { logout } = useApi();

    const { dispatch } = useContext(DataContext);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await logout();
        }
        dispatch({ type: 'LOGOUT', user: '' });
        fetchData();
        onLogout();
        navigate('/');
        // eslint-disable-next-line
    }, []);
}