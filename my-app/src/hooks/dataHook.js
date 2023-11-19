import { useEffect, useReducer } from 'react';
import { useApi } from '../services/dataService';

const initial = {};

function catalogReducer(x, action) {
    switch (action.type) {
        case 'FETCH_SUCCESS': {
            return { ...action.result };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export const useDataHook = () => {
    const { getAllDataInSystem } = useApi();
    const [_items, dispatch] = useReducer(catalogReducer, initial);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetch = async () => {
            try {
                const result = await getAllDataInSystem(signal);
                dispatch({ type: 'FETCH_SUCCESS', result });
            } catch (error) {
                console.log(error.message);
            }
        };
        fetch();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line     
    }, []);

    return {
        _items
    };
};