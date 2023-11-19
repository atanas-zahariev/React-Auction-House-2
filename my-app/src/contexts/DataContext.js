import { createContext, useEffect, useReducer } from 'react';
import { useApi } from '../services/dataService';

export const DataContext = createContext();


export const DataProvider = ({
    children,
}) => {
    console.log('DataContext is re-render');

    const { getAllDataInSystem } = useApi();
    const initial = {};

    function dataReducer(initial, action) {
        switch (action.type) {
            case 'FETCH_SUCCESS': {
                return { ...initial, ...action.result };
            }
            case 'USER': {
                return { ...initial, user: action.user };
            }
            case 'LOGOUT': {
                return { items: initial.items };
            }
            case 'UPDATE_BIDER': {
                return { ...initial, items: initial.items.map(x => x._id === action.id ? action.updatedItem : x) };
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }
    const [_items, dispatch] = useReducer(dataReducer, initial);

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