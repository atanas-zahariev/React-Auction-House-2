import { useContext, useEffect } from 'react';
import { Item } from './ItemComponent';
import { ErrorContext } from '../../../contexts/ErrorContext';
import { DataContext } from '../../../contexts/DataContext';
import { Link } from 'react-router-dom';

export default function Follow() {
    const { cleanError } = useContext(ErrorContext);
    const { _items } = useContext(DataContext);

    useEffect(() => {
        cleanError();
        //eslint-disable-next-line
    }, []);


    return (
        <section id="catalog-section" className="spaced">
            {_items?.items?.length > 0 ?
                <ul className="catalog cards">
                    {_items.items.map(x => <Item key={x._id} {...x} />)}
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