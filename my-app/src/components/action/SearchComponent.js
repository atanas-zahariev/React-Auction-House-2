import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../contexts/DataContext';
import { ErrorContext } from '../../contexts/ErrorContext';

export default function Search() {
    const navigate = useNavigate();

    const { cleanError } = useContext(ErrorContext);

    useEffect(() => {
        cleanError();
        // eslint-disable-next-line
    }, []);

    const { _items, setSearchItems } = useContext(DataContext);

    const search = ({ category, lower, upper }) => {
        let selectItems;
        selectItems = _items.items.filter(x => x.category === category);

        if (lower) {
            selectItems = selectItems.filter(x => x.price >= Number(lower));
        }

        if (upper) {
            selectItems = selectItems.filter(x => x.price <= Number(upper));
        }

        setSearchItems(selectItems);

        sessionStorage.setItem('search', JSON.stringify(selectItems));
    };

    const values = useRef({
        category: 'estate',
        lower: '',
        upper: ''
    });

    function getFormValue(e) {
        values.current[e.target.name] = e.target.value;
    }

    function onSubmit(e) {
        e.preventDefault();
        search(values.current);
        navigate('/search/table');
    }

    return (
        <section id="login-section" className="narrow">

            <h1 className="item">Search</h1>

            <div className="item padded align-center">

                <form className="aligned" onSubmit={onSubmit}>
                    <label>
                        <span>Choose category</span>
                        <select name="category" onChange={getFormValue} >
                            <option value="estate">Real Estate</option>
                            <option value="vehicles">Vehicles</option>
                            <option value="furniture">Furniture</option>
                            <option value="electronics">Electronics</option>
                            <option value="other">Other</option>
                        </select>
                    </label>

                    <label>
                        <span>Set a price floor</span>
                        <input id="lower-range" type="number" name="lower" onChange={getFormValue} />
                    </label>

                    <label>
                        <span>Set a price limit</span>
                        <input id="rangeValue" type="number" name="upper" onChange={getFormValue} />
                    </label>

                    <div className="align-center">
                        <input className="action" type="submit" value="Select" />
                    </div>

                </form>

            </div>

        </section>
    );

}