import { createContext, useEffect, useReducer, useState } from 'react';

import { useApi } from '../services/dataService';

import dataReducer from '../reducers/dataReducer';
import reducerTasks from '../reducers/reducerTasks';

export const DataContext = createContext();


export const DataProvider = ({
    children,
}) => {
    console.log('DataContext is re-render');

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
        const item = _items.items?.map(x => x._id === id ? x : '').filter(x => x !== '')[0];
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

    const search = ({ category, lower, upper }) => {
        let selectItems;
        selectItems = _items.items.filter(x => x.category === category);

        if (lower) {
            selectItems = selectItems.filter(x => x.price >= Number(lower));
        }
        
        if (upper) {
            selectItems = selectItems.filter(x => x.price <= Number(upper));
        }

        setSearchItems(selectItems);

        sessionStorage.setItem('search', JSON.stringify(selectItems));
    };

    const contextValues = {
        _items,
        dispatch,
        getItem,
        search,
        searchItems
    };

    return (
        <>
            <DataContext.Provider value={contextValues}>
                {children}
            </DataContext.Provider>
        </>
    );
};