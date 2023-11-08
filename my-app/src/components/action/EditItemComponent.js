import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorContext } from '../../contexts/ErrorContext';
import { DataContext } from '../../contexts/DataContext';

export default function EditItem() {
    const { getError, cleanError } = useContext(ErrorContext);

    const { getSpecificDataWithId, onEdit } = useContext(DataContext);

    const { id } = useParams();

    const navigate = useNavigate();

    const arrOfCategories = ['vehicles', ' real', 'estate', 'electronics', 'furniture', 'other'];

    const IMAGE_URL = /^https?:\/\/.*/i;

    const [oldItem, setOldItem] = useState({
        _id: '',
        title: '',
        category: '',
        imgUrl: '',
        price: '',
        description: '',
        bider: undefined
    });

    useEffect(() => {

        cleanError();
        // eslint-disable-next-line
    }, []);



    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getSpecificDataWithId(id);
                const { item, user } = result;
                if (!user || (user._id !== item.owner)) {
                    navigate('/login');
                    return;
                }
                setOldItem(result.item);
            } catch (error) {
                getError(error);
            }
        }

        fetchData();
        // eslint-disable-next-line
    }, [getError, id, navigate]);



    const changeHandler = (e) => {
        setOldItem(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    async function onSubmit(e) {
        e.preventDefault();

        const { title, category, imgUrl, price, description } = oldItem;

        if (Object.values(oldItem).some(x => x === '')) {
            getError(['All fields are required.']);
            return;
        }

        if (title) {
            if (title.length < 4) {
                getError(['Title must be at least 4 characters.']);
                return;
            }
        }

        if (category) {
            if (!arrOfCategories.includes(category)) {
                getError(['It is not in the list of categories.']);
                return;
            }
        }

        if (imgUrl) {
            if (!IMAGE_URL.test(imgUrl)) {
                getError(['Invalid Url.']);
                return;
            }
        }

        if (price) {
            if (Number(price) <= 0) {
                getError(['This price cannot be real.']);
                return;
            }
        }

        if (description) {
            if (description.length > 200) {
                getError(['Description must be at most 200 characters.']);
                return;
            };
        }


        try {
            await onEdit(id, oldItem);
            cleanError();
            navigate(`/details/${id}`);
        } catch (error) {
            getError(error);
        }
    }

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