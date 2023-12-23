import { Item } from './ItemComponent';

import Follow from './Follow';

import { catalogFetch } from '../../../hooks/useFetch';
import { useContext, useEffect } from 'react';
import { ErrorContext } from '../../../contexts/ErrorContext';
import { Link } from 'react-router-dom';

const { createResourse } = catalogFetch();

const resourse = createResourse();
const firstData = resourse.data;

let didSetInitialData = true;

export default function Catalog() {
    const data = firstData.read();
    const {cleanError} = useContext(ErrorContext);

    useEffect(() => {
        //clearing errors from other pages ->
        cleanError();
         // eslint-disable-next-line
    },[]);
    
    //demonstration of fetching data before rendering ->

    // if (didSetInitialData) {
    //     didSetInitialData = false;
    //     return (
    //         <section id="catalog-section" className="spaced">
    //             {data.items?.length > 0 ?
    //                 <ul className="catalog cards">
    //                     {data.items.map(x => <Item key={x._id} {...x} />)}
    //                 </ul> :
    //                 <div className="item pad-large align-center">
    //                     <p>Nothing has been listed yet. Be the first!</p>
    //                     <div>
    //                         <Link className="action" to="/create">Publish Auction</Link>
    //                     </div>
    //                 </div>
    //             }

    //         </section>
    //     );
    // } else {
        return (
            <Follow />
        );
    // }
}
