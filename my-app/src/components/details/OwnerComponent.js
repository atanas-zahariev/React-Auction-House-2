import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { DataContext } from '../../contexts/DataContext';
import { ErrorContext } from '../../contexts/ErrorContext';

import { useApi } from '../../services/dataService';
import { getUser } from '../../services/utility';

import reducerTasks from '../../reducers/reducerTasks';

import { useDataHook } from '../../hooks/dataHook';

export default function Owner({ item }) {
    const navigate = useNavigate();

    const [checkForUser, setCheck] = useState(false);

    const { getUserAction } = useApi();

    const { getError } = useContext(ErrorContext);

    const { removeProductFromList } = reducerTasks();

    const { title, imgUrl, category, description, price, bider, _id } = item.item;

    const { user } = item;

    const { dispatch } = useContext(DataContext);

    const onSubmit = useDataHook(getUserAction, removeProductFromList, [dispatch, _id], [_id], '/closed');

    if (checkForUser) {
        navigate('/logout');
    }


    function deleteItem() {
        const hasUser = getUser();

        if (!hasUser) {
            setCheck(true);
            return;
        }

        getError(`Delete/${title}/${_id}`);
    }





    return (
        <section id="catalog-section">

            <h1 className="item">
                {title}
                <div className="f-right">
                    <Link to={`/edit/${_id}`} className="action pad-small f-left" >Edit</Link>
                    <Link onClick={deleteItem} className="action pad-small f-left" >Delete</Link>
                </div>
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

                            <div>
                                {bider ?
                                    <div>
                                        Bid by <strong>{bider.firstname} {bider.lastname}</strong>
                                        <Link onClick={onSubmit} className="action pad-med cta">Close Auction</Link>
                                    </div> :
                                    <div>
                                        No bids
                                    </div>}
                            </div>
                        </div>

                    </div>
                </div>

                <footer>
                    <div>Listed by {user.username ? user.username : user.firstname} </div>
                </footer>
            </div>

        </section>
    );
}