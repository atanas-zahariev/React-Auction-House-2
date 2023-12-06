import { useContext, useEffect, useState} from 'react';

import { DataContext } from '../../contexts/DataContext';
import { ErrorContext } from '../../contexts/ErrorContext';

import { formHandller } from '../../services/utility';
import { SearchTable } from './SearchTable';

export default function Search() {
    const { _items } = useContext(DataContext);

    const { cleanError } = useContext(ErrorContext);

    useEffect(() => {
        cleanError();

        return () => {
         sessionStorage.clear();
        };
        // eslint-disable-next-line
    }, []);

    const [searchItems, setSearchItems] = useState(() => {
        const searchItemsState = sessionStorage.getItem('search');

        if (searchItemsState) {
            const hasSearchItems = JSON.parse(searchItemsState);

            return hasSearchItems;
        }
        return null;
    });

    const search = ({ category, lower, upper }) => {
        let selectItems;
        selectItems = _items.items.filter(x => x.category === category);

        if (lower) {
            selectItems = selectItems.filter(x => x.price >= Number(lower));
        }

        if (upper) {
            selectItems = selectItems.filter(x => x.price <= Number(upper));
        }

        setStateAndSession(setSearchItems, selectItems);
    };


    const onSubmit = formHandller(search);

    return (
        <>
        <section id="login-section" className="spaced">

            <h1 className="item narrow">Search</h1>
            <div className="item padded align-center narrow">

                <form className="aligned" onSubmit={onSubmit}>
                    <label>
                        <span>Choose category</span>
                        <select name="category"  >
                            <option value="estate">Real Estate</option>
                            <option value="vehicles">Vehicles</option>
                            <option value="furniture">Furniture</option>
                            <option value="electronics">Electronics</option>
                            <option value="other">Other</option>
                        </select>
                    </label>

                    <label>
                        <span>Set a price floor</span>
                        <input id="lower-range" type="number" name="lower" />
                    </label>

                    <label>
                        <span>Set a price limit</span>
                        <input id="rangeValue" type="number" name="upper" />
                    </label>

                    <div className="align-center">
                        <input className="action" type="submit" value="Select" />
                    </div>

                </form>

            </div>

        </section>

            {searchItems && <SearchTable searchItems={searchItems} />}
        </>
    );

}

function setStateAndSession(setSearchItems, selectItems) {
    setSearchItems(selectItems);

    sessionStorage.setItem('search', JSON.stringify(selectItems));
}