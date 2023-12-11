import { useContext } from 'react';
import { useApi } from '../../hooks/dataService';
import { validationHook } from '../../hooks/validationHook';
import { formHandller } from '../../services/utility';
import { ErrorContext } from '../../context/ErrorContext';

export default function NotOwner({ item, setNewState }) {
    const { user } = item;

    const { title, imgUrl, category, description, price, bider, _id } = item.item;

    const currentUser = user?._id;

    const isBider = bider?._id === currentUser;

    const { offer } = useApi();

    const { getError } = useContext(ErrorContext);

    const setBider = async (data) => {
        data.oldPrice = item.item.price;
        data.price = Number(data.price);
        try {
            validationHook(data);
            const result = await offer(data, _id);
            setNewState(result);
        } catch (error) {
            getError(error);
        }
    };

    const onSubmit = formHandller(setBider);

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
                                            <label><span>Bid amount</span><input type="number" name="price" /></label>
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