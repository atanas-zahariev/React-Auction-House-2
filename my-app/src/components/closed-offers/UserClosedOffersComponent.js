import { useContext, useEffect, useState } from 'react';

import FinishedOffers from './FinishedOffersComponent';

import { ErrorContext } from '../../contexts/ErrorContext';
import { useApi } from '../../services/dataService';
import { useDataHook } from '../../hooks/dataHook';

export default function UserClosedOffers() {
    const { getError, cleanError } = useContext(ErrorContext);

    const { getTotalAction } = useApi();

    const [offers, setOffers] = useState({});

    const onSubmit = useDataHook(getTotalAction,setOffers,[],[]);

    useEffect(() => {
        cleanError();
        
        onSubmit();
        // eslint-disable-next-line
    }, [getError]);

    const { items } = offers;

    return (
        <section id="catalog-section" className="spaced">

            <h1 className="item">Closed Auctions</h1>

            {items?.length > 0 ?
                <ul className="catalog cards">
                    {items.map(x => <FinishedOffers key={x._id} {...x} />)}
                </ul>
                :
                <div className="item pad-large align-center">
                    <p>You haven't closed any auctions yet.</p>
                </div>
            }
        </section>
    );
}