import { useContext, useEffect } from 'react';

import { DataContext } from '../../contexts/DataContext';
import { ErrorContext } from '../../contexts/ErrorContext';

import { useApi } from '../../services/dataService';
import reducerTasks from '../../reducers/reducerTasks';
import useFormHook from '../../hooks/formHook';

export default function Create() {
    const { dispatch } = useContext(DataContext);

    const { cleanError } = useContext(ErrorContext);

    const { addInSystem } = useApi();

    const { createItem } = reducerTasks();

    const values = {
        title: '',
        category: 'estate',
        imgUrl: '',
        price: '',
        description: '',
    };

    useEffect(() => {
        cleanError();
        // eslint-disable-next-line
    }, []);

    const {
        onSubmit,
        changeHandler,
        formValue
    } = useFormHook(
        values,
        addInSystem,
        createItem,
        [dispatch],
        undefined,
        '/catalog'
    );

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
                            <select name="category" value={formValue.category} onChange={changeHandler}>
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