import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NotOwner from './NotOwnerComponent';
import Owner from './OwnerComponent';

import { ErrorContext } from '../../contexts/ErrorContext';
import { useDetailsHook } from '../../hooks/detailsHook';

export default function Details() {
    const { cleanError } = useContext(ErrorContext);

    const { id } = useParams();

    const{_item,setNewState,offer} = useDetailsHook(id);

    useEffect(() => {
        cleanError();
        // eslint-disable-next-line
    }, []);

    console.log('Details is re-render');

    if (_item.item) {
        const isOwner = _item.item.owner === _item.user?._id;
        if (isOwner) {
            return (
                <Owner item={_item} />
            );
        }
        return (
            <NotOwner item={_item} setNewState={setNewState} offer={offer} />
        );

    }
}