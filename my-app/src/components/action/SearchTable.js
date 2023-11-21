import { Item } from '../common/Catalog/ItemComponent';

export const SearchTable = ({withCategory}) => {
    return (
        <section id="catalog-section" className="spaced">
            {withCategory.length > 0 ?
                <ul className="catalog cards">
                    {withCategory.map(x => <Item key={x._id} {...x} />)}
                </ul> :
                <div className="item pad-large align-center">
                    <p>Nothing Found!</p>                  
                </div>
            }

        </section>
    );
};

