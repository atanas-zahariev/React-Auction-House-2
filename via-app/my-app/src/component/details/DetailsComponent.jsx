import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorContext } from '../../context/ErrorContext';

import { useApi } from '../../hooks/dataService';
import Owner from './OwnerComponent';
import Spinner from '../common/Spinner';
import NotOwner from './NotOwnerComponent';

export default function Details(){
    const {id} = useParams();
    const {getError,cleanError} = useContext(ErrorContext);
    const {getSpecificDataWithId} = useApi();
    
    const [item,setItem] = useState({});

    const getItem = async () => {
        try {
            const result = await getSpecificDataWithId(id);
            setItem(item => ({...item,...result}));
        } catch (error) {
            getError(error);
        }
    };

    useEffect(() => {
        cleanError();
        getItem();
        // eslint-disable-next-line
    }, []);

    function setNewState({ updatedItem, user }) {
        setItem(() => ({ item: { ...updatedItem }, user: { ...user } }));
    }

    if (item.item) {
        const isOwner = item.item.owner === item.user?._id;
        if (isOwner) {
            return (
                <Owner item={item} />
            );
        }
        return (
            <NotOwner item={item} setNewState={setNewState}/>
        );
    }

    return (
        <Spinner />
    );
}