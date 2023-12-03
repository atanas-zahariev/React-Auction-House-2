import { useContext, useEffect } from 'react';

import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

import { useApi } from '../../services/dataService';
import reducerTasks from '../../reducers/reducerTasks';
import { useDataHook } from '../../hooks/dataHook';

export default function Logout() {
    const { dispatch } = useContext(DataContext);

    const { onLogout } = useContext(AuthContext);

    const { logout } = useApi();

    const { removeUser } = reducerTasks();

    const onSubmit = useDataHook(logout, removeUser, [dispatch], [], '/', undefined, onLogout);

    useEffect(() => {
        onSubmit();
        // eslint-disable-next-line
    }, []);
}