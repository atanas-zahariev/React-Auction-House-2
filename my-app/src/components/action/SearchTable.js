import { Item } from '../common/Catalog/ItemComponent';

export const SearchTable = ({searchItems}) => {
    return (
        <section id="catalog-section" className="spaced">
            {searchItems?.length > 0 ?
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

