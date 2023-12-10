import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useApi } from '../../hooks/dataService';


export default function Logout() {
    const { onLogout } = useContext(AuthContext);
    const {logout} = useApi();

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