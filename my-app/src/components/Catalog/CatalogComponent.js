import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Item } from './ItemComponent';

import { ErrorContext } from '../../contexts/ErrorContext';

import { useApi } from '../../services/dataService';

let didSetInitialData = true;

export default function Catalog({resourse}) {
    const {getAllDataInSystem} = useApi();
    const navigate = useNavigate();
    const { cleanError} = useContext(ErrorContext);

    const [_items, setItems ] = useState({});

    useEffect(() => {
        cleanError();
        try {
            const data = resourse.read();
            if(didSetInitialData){
                console.log('if');
                setItems(items => ({...items,...data}));
                didSetInitialData = false;
                return;
            }
            console.log('else');
            getAllDataInSystem().then(result => setItems(items => ({ ...items, ...result })));

        } catch (error) {
            navigate('/logout');
        }
        // eslint-disable-next-line
    }, []);
    cleanError();


    console.log('Catalog is re-render');

    return (
        <section id="catalog-section" className="spaced">
            {_items.items ?
                <ul className="catalog cards">
                    {_items.items.map(x => <Item key={x._id} {...x} />)}
                </ul> :
                <div className="item pad-large align-center">
                    <p>Nothing has been listed yet. Be the first!</p>
                    <div>
                        <a className="action" href="/house/create">Publish Auction</a>
                    </div>
                </div>
            }

        </section>
    );
}