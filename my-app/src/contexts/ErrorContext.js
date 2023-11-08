import { createContext } from 'react';

import { useErrorHook } from '../hooks/errorHook';

export const ErrorContext = createContext();

export const ErrorProvider = ({
    children
}) => {
    const [error, setErrorState] = useErrorHook('');

    const getError = (err) => {
        setErrorState(err);
    };

    const cleanError = () => {
        setErrorState('');
    };

    const contextValues = {
        getError,
        cleanError,
        error
    };

    return (
        <>
            <ErrorContext.Provider value={contextValues}>
                {children}
            </ErrorContext.Provider>
        </>
    );
};