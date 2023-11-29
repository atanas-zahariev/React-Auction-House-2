import { useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';

import { Item } from '../common/Catalog/ItemComponent';

export const SearchTable = () => {
    const {searchItems} = useContext(DataContext);

    return (
        <section id="catalog-section" className="spaced">
            {searchItems.length > 0 ?
                <ul className="catalog cards">
                    {searchItems.map(x => <Item key={x._id} {...x} />)}
                </ul> :
                <div className="item pad-large align-center">
                    <p>Nothing Found!</p>                  
                </div>
            }

        </section>
    );
};

