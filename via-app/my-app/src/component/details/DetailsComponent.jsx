import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorContext } from '../../context/ErrorContext';

import { useApi } from '../../hooks/dataService';

export default function Details(){
    const {id} = useParams();
    const {getError,cleanError} = useContext(ErrorContext);
    const {getSpecificDataWithId} = useApi();
    
    const [item,setItem] = useState({});

    const getItem = async () => {
        try {
            const result = await getSpecificDataWithId(id);
            setItem(item => ({...item,result}));
        } catch (error) {
            getError(error);
        }
    };

    useEffect(() => {
        cleanError();
        // eslint-disable-next-line
    }, []);

    if (item.item) {
        const isOwner = item.item.owner === item.user?._id;
        if (isOwner) {
            return (
                <Owner item={item} />
            );
        }
        return (
            <NotOwner item={item} id={id}/>
        );
    }

    return (
        <Spinner />
    );
}