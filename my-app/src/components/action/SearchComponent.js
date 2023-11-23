import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../contexts/DataContext';

export default function Search() {
    const navigate = useNavigate();

    const { search } = useContext(DataContext);

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
    // function myFunctionLower(value) {
    //     // document.getElementById('lower-range').value = value.target.value;
    //     document.getElementById('lower-range').innerHTML = value.target.value;
    // }

    // function myFunctionHaigher(value) {
    //     // document.getElementById('rangeValue').value = value.target.value;
    //     document.getElementById('rangeValue').innerHTML = value.target.value;
    // }
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

                    {/* <label>
                        <span>Set Lower Bound</span>
                        <input name="lower" type="range" min={0} max={1000} step={10} onInput={myFunctionLower} onChange={getFormValue} />
                        <p id="lower-range">0</p>
                    </label> */}
                    <label>
                        <span>Set a price limit</span>
                        <input id="rangeValue" type="number" name="upper" onChange={getFormValue} />
                    </label>
                    {/* <label>
                        <span>Set Upper Limit</span>
                        <input name="upper" type="range" min={1000} max={100000} step={1000} onInput={myFunctionHaigher} onChange={getFormValue} />
                        <p id="rangeValue">1000</p>
                    </label> */}

                    <div className="align-center">
                        <input className="action" type="submit" value="Select" />
                    </div>

                </form>

            </div>

        </section>
    );

}