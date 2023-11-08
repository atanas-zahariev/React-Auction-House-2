import { createContext } from 'react';
import { useApi } from '../services/dataService';

export const DataContext = createContext();


export const DataProvider = ({
    children,
}) => {
    console.log('DataContext is re-render');
    const contextValues = useApi();

    return (
        <>
            <DataContext.Provider value={contextValues}>
                {children}
            </DataContext.Provider>
        </>
    );
};