import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NotOwner from './NotOwnerComponent';
import Owner from './OwnerComponent';

import { ErrorContext } from '../../contexts/ErrorContext';
import { DataContext } from '../../contexts/DataContext';

export default function Details() {
    const { cleanError } = useContext(ErrorContext);

    const { id } = useParams();

    useEffect(() => {
        cleanError();
        // eslint-disable-next-line
    }, []);  

    const {getItem} = useContext(DataContext);
    const _item = getItem(id);

    if (_item.item) {
        const isOwner = _item.item.owner === _item.user?._id;
        if (isOwner) {
            return (
                <Owner item={_item} />
            );
        }
        return (
            <NotOwner item={_item} id={id}/>
        );

    }
}