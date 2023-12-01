import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DataContext } from '../../contexts/DataContext';
import { ErrorContext } from '../../contexts/ErrorContext';

import { useApi } from '../../services/dataService';
import reducerTasks from '../../reducers/reducerTasks';

import Spinner from '../common/Spiner';
import { useDataHook } from '../../hooks/dataHook';

export default function EditItem() {
    const { cleanError } = useContext(ErrorContext);

    const { onEdit } = useApi();

    const { dispatch, getItem } = useContext(DataContext);

    const { id } = useParams();

    const { updateItem } = reducerTasks();

    const [oldItem, setOldItem] = useState({
        _id: '',
        title: '',
        category: '',
        imgUrl: '',
        price: '',
        description: '',
        bider: undefined
    });

    const { item } = getItem(id);

    useEffect(() => {
        cleanError();

        setOldItem(item);
        // eslint-disable-next-line
    }, [item]);

    const changeHandler = (e) => {
        setOldItem(state => ({ ...state, [e.target.name]: e.target.value }));
    };


    const onSubmit = useDataHook(
        onEdit,
        updateItem,
        [dispatch, id, oldItem],
        [id, oldItem],
        `/details/${id}`,
        oldItem
    );

    if (oldItem) {

        return (
            <section id="create-section">

                <h1 className="item">Edit Auction</h1>

                <div className="item padded align-center">

                    <form className="layout left large" onSubmit={onSubmit} >

                        <div className="col aligned">
                            <label>
                                <span>Title</span>
                                <input type="text" name="title" value={oldItem.title} onChange={changeHandler} />
                            </label>

                            <label>
                                <span>Category</span>
                                <select name="category" value={oldItem.category} onChange={changeHandler} >
                                    <option value="estate">Real Estate</option>
                                    <option value="vehicles">Vehicles</option>
                                    <option value="furniture">Furniture</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>

                            <label>
                                <span>Image URL</span>
                                <input type="text" name="imgUrl" value={oldItem.imgUrl} onChange={changeHandler} />
                            </label>

                            <label>
                                <span>Starting price</span>
                                <input type="number" name="price"
                                    value={oldItem.price}
                                    onChange={changeHandler}
                                    disabled={(oldItem.bider) ? 'disabled' : ''} />
                            </label>
                        </div>

                        <div className="content pad-med align-center vertical">
                            <label>
                                <span>Description</span>
                                <textarea name="description" value={oldItem.description} onChange={changeHandler}></textarea>
                            </label>

                            <div className="align-center">
                                <input className="action" type="submit" value="Update Listing" />
                            </div>
                        </div>

                    </form>

                </div>

            </section>
        );
    }

    return (
        <Spinner />
    );
}