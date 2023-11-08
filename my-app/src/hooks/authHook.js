import { useState } from 'react';

export const useAuthHook = (key,initial) => {
    const [state,setState] = useState(() => {
        const localStorageState = localStorage.getItem(key);
        if(localStorageState){
            const hasState = JSON.parse(localStorageState);

            return hasState;
        }

        return initial;
    });

    const setLocalStorageState = (value) => {
        setState(value);
    };

    return [
        state,
        setLocalStorageState
    ];
};