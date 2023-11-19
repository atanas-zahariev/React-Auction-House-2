import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorContext } from '../../contexts/ErrorContext';
import { useApi } from '../../services/dataService';
import { DataContext } from '../../contexts/DataContext';
import reducerTasks from '../../reducers/reducerTasks';

export default function NotOwner({ item, id }) {
    console.log('NotOwner is re-render');
    const { offer } = useApi();
    const { dispatch } = useContext(DataContext);
    const { setBider } = reducerTasks();
    const { user } = item;

    const { title, imgUrl, category, description, price, bider, _id } = item.item;

    const { getError } = useContext(ErrorContext);

    const navigate = useNavigate();

    const currentUser = user?._id;

    const isBider = bider?._id === currentUser;

    const [newOffer, setOffer] = useState({
        price: ''
    });

    function getOffer(e) {
        setOffer(() => ({ ...newOffer, [e.target.name]: e.target.value }));
    }

    async function onSubmit(e) {
        e.preventDefault();

        if (Number(newOffer.price) <= 0) {
            getError(['Price must be greather than zero']);
            return;
        }

        if (Number(newOffer.price) <= price) {
            getError(['You bid must be higher, see the existing one.']);
            return;
        }

        item.item.price = Number(newOffer.price);

        try {
            const result = await offer(_id, item.item);
            setBider(dispatch, id, result);
        } catch (error) {
            getError(error);
        }

        navigate(`/details/${_id}`);
    }

    return (
        <section id="catalog-section">

            <h1 className="item">
                {title}
            </h1>
            <div className="item padded">

                <div className="layout right large">

                    <div className="col">
                        <img src={imgUrl} className="img-large" alt="" />
                    </div>

                    <div className="content pad-med">

                        <p>In category: <strong>{category}</strong></p>
                        <p>{description}</p>

                        <div className="align-center">
                            <div>
                                Current price: $<strong>{price}</strong>
                            </div>

                            {currentUser ?
                                <div>
                                    {isBider ?
                                        <div>
                                            You are currently the <strong>highest bidder</strong> for this auction
                                        </div> :
                                        <form className="vertical" onSubmit={onSubmit}>
                                            <label><span>Bid amount</span><input type="number" name="price" onChange={getOffer} /></label>
                                            <input className="action" type="submit" value="Place bid" />
                                        </form>
                                    }
                                </div> :
                                null
                            }

                        </div>

                    </div>
                </div>

                <footer>
                    {user ?
                        <div>Listed by {user.username ? user.username : user.firstname} </div>
                        : null
                    }
                </footer>
            </div>

        </section>
    );
}