import { useEffect, useState } from 'react';
import { useApi } from '../services/dataService';

export const useDetailsHook = (id) => {
    const { getSpecificDataWithId,offer} = useApi();
    const [_item, setItem] = useState({});

    useEffect(() => {
        if (id) {
            getSpecificDataWithId(id).then(result => setItem(state => ({ ...state, ...result })));
        }

        // eslint-disable-next-line
    }, []);

    function setNewState({ updatedItem, user }) {
        setItem(() => ({ ..._item, item: { ...updatedItem }, user: { ...user } }));
    }

    return {
        _item,
        setNewState,
        offer
    };
};