import { useContext, useEffect, useState } from 'react';

import FinishedOffers from './FinishedOffersComponent';
import { useApi } from '../../hooks/dataService';
import { ErrorContext } from '../../context/ErrorContext';


export default function UserClosedOffers() {
    const { getError, cleanError } = useContext(ErrorContext);

    const { getTotalAction } = useApi();

    const [offers, setOffers] = useState({});
   
    const getUserClosedOffers = async () => {
        try {
            const result = await getTotalAction();
            setOffers(result.items);
        } catch (error) {
            getError(error);
        }
    };
     
    useEffect(() => {
        cleanError();
        getUserClosedOffers();
        // eslint-disable-next-line
    }, []);

    return (
        <section id="catalog-section" className="spaced">

            <h1 className="item">Closed Auctions</h1>

            {offers?.length > 0 ?
                <ul className="catalog cards">
                    {offers.map(x => <FinishedOffers key={x._id} {...x} />)}
                </ul>
                :
                <div className="item pad-large align-center">
                    <p>You haven't closed any auctions yet.</p>
                </div>
            }
        </section>
    );
}