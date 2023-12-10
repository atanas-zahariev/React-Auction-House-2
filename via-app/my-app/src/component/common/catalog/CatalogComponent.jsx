import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ErrorContext } from '../../../context/ErrorContext';

import { useApi } from '../../../hooks/dataService';
import { Item } from './ItemComponent';

export default function Catalog(){
    const {getError,cleanError} = useContext(ErrorContext);
    const {getAllDataInSystem} = useApi();
    
    const [items,setItems] = useState({});

    const getCatalogList = async () => {
        try {
            const result = await getAllDataInSystem();
            setItems(items => ({...items,...result}));
        } catch (error) {
            getError(error);
        }
    };

    useEffect(() => {
        cleanError();
        getCatalogList();
        // eslint-disable-next-line
    }, []);

    return (
        <section id="catalog-section" className="spaced">
            {items?.items?.length > 0 ?
                <ul className="catalog cards">
                    {items.items.map(x => <Item key={x._id} {...x} />)}
                </ul> :
                <div className="item pad-large align-center">
                    <p>Nothing has been listed yet. Be the first!</p>
                    <div>
                        <Link className="action" to="/create">Publish Auction</Link>
                    </div>
                </div>
            }

        </section>
    );
}