import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ErrorContext } from '../../contexts/ErrorContext';
import { DataContext } from '../../contexts/DataContext';

export default function Owner({ item }) {
    const navigate = useNavigate();

    const { getError } = useContext(ErrorContext);

    const {getItem} = useContext(DataContext);
    
    function deleteItem() {
        const { item, user } = getItem(_id);
        
        if (!user || (user._id !== item.owner)) {
            navigate('/logout');
            return;
        }

        getError(`Delete/${title}/${_id}`);
    }
    
    const { title, imgUrl, category, description, price, bider, _id } = item.item;

    const { user } = item;

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
                                        <Link to={`/userAction/${_id}`} className="action pad-med cta">Close Auction</Link>
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