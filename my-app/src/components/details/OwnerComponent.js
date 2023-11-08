import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorContext } from '../../contexts/ErrorContext';
import { DataContext } from '../../contexts/DataContext';
//import { onDelete } from '../../services/data';

export default function Owner({ item }) {
    const navigate = useNavigate();
    const{getError} = useContext(ErrorContext);
    const {onDelete} = useContext(DataContext);


    const { title, imgUrl, category, description, price, bider, _id,owner } = item.item;

    const {user} = item;

    async function deleteItem(){
        try {            
            if (!user || (user._id !== owner)) {
                navigate('/login');
                return;
            }

            const confirmed = window.confirm(`Are you sure you want to delete ${title}`);

            if(confirmed){
                await onDelete(_id);
                navigate('/catalog');
            }
        } catch (error) {
            getError(error);
        }
    }

    return (
        <section id="catalog-section">

            <h1 className="item">
                {title}
                <div className="f-right">
                    <Link to={`/edit/${_id}`} className="action pad-small f-left" >Edit</Link>
                    <button onClick={deleteItem}  className="action pad-small f-left" >Delete</button>
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
                    <div>Listed by {item.user.username} </div>
                </footer>
            </div>

        </section>
    );
}