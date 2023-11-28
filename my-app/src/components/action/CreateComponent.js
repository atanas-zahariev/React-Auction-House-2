import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorContext } from '../../contexts/ErrorContext';
import { DataContext } from '../../contexts/DataContext';

import { useApi } from '../../services/dataService';
import reducerTasks from '../../reducers/reducerTasks';
import { validationHook } from '../../hooks/validationHook';

export default function Create() {
    const { getError, cleanError } = useContext(ErrorContext);
    
    const navigate = useNavigate();

    const {addInSystem} = useApi();

    const {dispatch} = useContext(DataContext);

    const {createItem} = reducerTasks();


    const [values, setValues] = useState({
        title: '',
        category: 'estate',
        imgUrl: '',
        price: '',
        description: '',
    });

    useEffect(() => {
        cleanError();
        // eslint-disable-next-line
    }, []);



    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    async function onSubmit(e) {
        e.preventDefault();       
        
        try {
            validationHook(values);
            const result = await addInSystem(values);
            createItem(dispatch,result);
            navigate('/catalog');
        } catch (error) {
            getError(error);
        }
    }

    return (
        <section id="create-section" className="">

            <h1 className="item">New Auction</h1>

            <div className="item padded align-center">

                <form className="layout left large" onSubmit={onSubmit}>

                    <div className="col aligned">
                        <label>
                            <span>Title</span>
                            <input type="text" name="title" onChange={changeHandler} /></label>
                        <label>
                            <span>Category</span>
                            <select name="category" value={values.category} onChange={changeHandler}>
                                <option value="estate">Real Estate</option>
                                <option value="vehicles">Vehicles</option>
                                <option value="furniture">Furniture</option>
                                <option value="electronics">Electronics</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <label>
                            <span>Image URL</span>
                            <input type="text" name="imgUrl" onChange={changeHandler} /></label>
                        <label>
                            <span>Starting price</span>
                            <input type="number" name="price" onChange={changeHandler} /></label>
                    </div>

                    <div className="content pad-med align-center vertical">
                        <label>
                            <span>Description</span>
                            <textarea name="description" onChange={changeHandler}></textarea>
                        </label>

                        <div className="align-center">
                            <input className="action" type="submit" value="Publish Item" />
                        </div>
                    </div>

                </form>

            </div>

        </section>
    );
}