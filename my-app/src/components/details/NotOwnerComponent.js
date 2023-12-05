import { useContext } from 'react';

import { DataContext } from '../../contexts/DataContext';
import { ErrorContext } from '../../contexts/ErrorContext';

import { useApi } from '../../services/dataService';
import reducerTasks from '../../reducers/reducerTasks';
import useFormHook from '../../hooks/formHook';

export default function NotOwner({ item, id }) {
    const { offer } = useApi();

    const { dispatch } = useContext(DataContext);

    const { setBider } = reducerTasks();

    const { user } = item;

    const { title, imgUrl, category, description, price, bider, _id } = item.item;

    const { cleanError } = useContext(ErrorContext);

    const currentUser = user?._id;

    const isBider = bider?._id === currentUser;

    const newOffer = {
        title,
        imgUrl,
        category,
        description,
        price: '',
        _id
    };

    const validationParams = { oldPrice: price };

    const {
        onSubmit,
        changeHandler,
    } = useFormHook(
        newOffer,
        offer,
        setBider,
        [dispatch, id],
        id,
        `/details/${_id}`,
        cleanError,
        validationParams
    );

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
                                            <label><span>Bid amount</span><input type="number" name="price" onChange={changeHandler} /></label>
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