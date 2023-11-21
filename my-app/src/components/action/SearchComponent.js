import { useRef } from 'react';

export default function Search() {

    const values = useRef({
        category: 'estate',
        range: '0'
    });
    function getFormValue(e) {
        values.current[e.target.name] = e.target.value;
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log(values);
    }
    function myFunction(value) {
        document.getElementById('rangeValue').innerHTML = value.target.value;
        // console.log(value.target.value);
    }

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
                    <label>
                        
                            <span>Price</span>
                            <input name="range" type="range" min={0} max={1000} step={10} onInput={myFunction} onChange={getFormValue} />
                            <p id="rangeValue">100</p>
                    </label>

                    <div className="align-center">
                        <input className="action" type="submit" value="Select" />
                    </div>

                </form>

            </div>

        </section>


    );
}