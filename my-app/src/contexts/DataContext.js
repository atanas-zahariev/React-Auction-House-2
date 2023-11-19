import { createContext, useEffect, useReducer } from 'react';

import { useApi } from '../services/dataService';

import dataReducer from '../reducers/dataReducer';
import reducerTasks from '../reducers/reducerTasks';

export const DataContext = createContext();


export const DataProvider = ({
    children,
}) => {
    console.log('DataContext is re-render');

    const { getAllDataInSystem } = useApi();
    const {getCatlogList} = reducerTasks();
    const initial = {};
 
    const [_items, dispatch] = useReducer(dataReducer, initial);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetch = async () => {
            try {
                const result = await getAllDataInSystem(signal);
                getCatlogList(dispatch,result);
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

    const contextValues = useApi();
    contextValues._items = _items;
    contextValues.dispatch = dispatch;
    contextValues.getItem = getItem;
    return (
        <>
            <DataContext.Provider value={contextValues}>
                {children}
            </DataContext.Provider>
        </>
    );
};