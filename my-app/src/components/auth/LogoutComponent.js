import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';

export default function Logout() {
    const { onLogout } = useContext(AuthContext);

    const { logout } = useContext(DataContext);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await logout();
        }
        fetchData();
        onLogout();
        navigate('/');
        // eslint-disable-next-line
    }, []);
}