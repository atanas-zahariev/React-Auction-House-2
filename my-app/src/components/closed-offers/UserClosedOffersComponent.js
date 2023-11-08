import { useContext, useEffect, useState } from 'react';
import FinishedOffers from './FinishedOffersComponent';

import { ErrorContext } from '../../contexts/ErrorContext';
import { DataContext } from '../../contexts/DataContext';

export default function UserClosedOffers() {
    const { getError } = useContext(ErrorContext);

    const { getTotalAction } = useContext(DataContext);
    
    const [offers, setOffers] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getTotalAction();
                setOffers(result);
            } catch (error) {
                getError(error);
            }
        }

        fetchData();
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