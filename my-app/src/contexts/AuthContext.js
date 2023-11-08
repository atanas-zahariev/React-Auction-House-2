import { createContext } from 'react';

import { useAuthHook } from '../hooks/authHook';

import { getUser } from '../services/utility';

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [state, setState] = useAuthHook('user', '');

    const onLoginSubmit = () => {
        setState(getUser());
    };

    const onRegisterSubmit = () => {
        setState(getUser());
    };

    const onLogout = () => {
        setState('');
    };

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        state
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};