import { createContext, useEffect, useReducer } from 'react';

import { useApi } from '../services/dataService';

import dataReducer from '../reducers/dataReducer';
import reducerTasks from '../reducers/reducerTasks';
import { useDataHook } from '../hooks/dataHook';

export const DataContext = createContext();


export const DataProvider = ({
    children,
}) => {
    const { getAllDataInSystem } = useApi();

    const { getCatlogList } = reducerTasks();

    const initial = {};

    const [_items, dispatch] = useReducer(dataReducer, initial);

    const controller = new AbortController();
    const signal = controller.signal;

    const onSubmit = useDataHook(getAllDataInSystem, getCatlogList, [dispatch], [signal]);

    useEffect(() => {
        onSubmit();

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line     
    }, []);

    const getItem = (id) => {
        const item = _items.items?.filter(x => x._id === id)[0];
        const user = _items.user;
        if (user) {
            return {
                item,
                user
            };
        };

        return {
            item
        };
    };


    const contextValues = {
        _items,
        dispatch,
        getItem,
        // searchItems,
        // setSearchItems,
    };

    return (
        <>
            <DataContext.Provider value={contextValues}>
                {children}
            </DataContext.Provider>
        </>
    );
};