import { createContext, useEffect, useReducer, useState } from 'react';

import { useApi } from '../services/dataService';

import dataReducer from '../reducers/dataReducer';
import reducerTasks from '../reducers/reducerTasks';

export const DataContext = createContext();


export const DataProvider = ({
    children,
}) => {
    const { getAllDataInSystem } = useApi();
    const { getCatlogList } = reducerTasks();
    const initial = {};

    const [_items, dispatch] = useReducer(dataReducer, initial);

    const [searchItems, setSearchItems] = useState(() => {
        const searchItemsState = sessionStorage.getItem('search');

        if (searchItemsState) {
            const hasSearchItems = JSON.parse(searchItemsState);

            return hasSearchItems;
        }
        return [];
    });

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetch = async () => {
            try {
                const result = await getAllDataInSystem(signal);
                getCatlogList(dispatch, result);
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
        searchItems,
        setSearchItems
    };

    return (
        <>
            <DataContext.Provider value={contextValues}>
                {children}
            </DataContext.Provider>
        </>
    );
};