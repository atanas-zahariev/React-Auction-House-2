import { useContext, useRef, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { SearchTable } from './SearchTable';

export default function Search() {
    const { search } = useContext(DataContext);

    const [isSearching, setSearch] = useState(true);
    const items = useRef();
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
        const withCategory = search(values.current);
        console.log(withCategory);
        items.current = withCategory;
        setSearch(false);
    }
    function myFunctionLower(value) {
        // document.getElementById('lower-range').value = value.target.value;
        document.getElementById('lower-range').innerHTML = value.target.value;
    }

    function myFunctionHaigher(value) {
        // document.getElementById('rangeValue').value = value.target.value;
        document.getElementById('rangeValue').innerHTML = value.target.value;
    }
    if (isSearching) {
        return (
            <section id="login-section" className="narrow">

                <h1 className="item">Search</h1>

                <div className="item padded align-center">

                    <form className="aligned" onSubmit={onSubmit}>
                        <label>
                            <span>Category</span>
                            <select name="category" onChange={getFormValue} >
                                <option value="estate">Real Estate</option>
                                <option value="vehicles">Vehicles</option>
                                <option value="furniture">Furniture</option>
                                <option value="electronics">Electronics</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        {/* <label>
                            <span>Lower Bound</span>
                            <input id="lower-range" type="number" name="price" />
                        </label> */}
                        <label>
                            <span>Set Lower Bound</span>
                            <input name="lower" type="range" min={0} max={1000} step={10} onInput={myFunctionLower} onChange={getFormValue} />
                            <p id="lower-range">0</p>
                        </label>
                        {/* <label>
                            <span>Upper Limit</span>
                            <input id="rangeValue" type="number" name="price" />
                        </label> */}
                        <label>
                            <span>Set Upper Limit</span>
                            <input name="upper" type="range" min={1000} max={100000} step={1000} onInput={myFunctionHaigher} onChange={getFormValue} />
                            <p id="rangeValue">1000</p>
                        </label>

                        <div className="align-center">
                            <input className="action" type="submit" value="Select" />
                        </div>

                    </form>

                </div>

            </section>
        );
    } else {
        return (
            <SearchTable withCategory={items.current} />
        );
    }
}