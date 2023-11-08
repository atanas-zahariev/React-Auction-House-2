import { useState } from 'react';

export const useErrorHook = () => {
    const [state,setState] = useState('');

    const setErrorState = (value) => {
        setState(value);
    };

    return [
        state,
        setErrorState
    ];
};