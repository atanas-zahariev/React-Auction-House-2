import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';
import { ErrorContext } from '../../contexts/ErrorContext';

import { useApi } from '../../services/dataService';

export default function Logout() {
    const { onLogout } = useContext(AuthContext);

    const { logout } = useApi();

    const { dispatch } = useContext(DataContext);

    const { getError } = useContext(ErrorContext);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                await logout();
            } catch (error) {
                getError(error);
            }
        }
        fetchData();
        dispatch({ type: 'LOGOUT', user: '' });
        onLogout();
        navigate('/');
        // eslint-disable-next-line
    }, []);
}