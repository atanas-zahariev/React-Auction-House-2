// import { useContext, useEffect, useState } from 'react';
// import { DataContext } from '../contexts/DataContext';
// import { useApi } from '../services/dataService';

// // import { useFetch } from './useFetch';
// export const useDataHook = (data) => {  
//    const { getAllDataInSystem } = useApi();   
//    const [_items, setItems] = useState({});
//    const [initial, setInitial] = useState(0);

//    useEffect(() => {
//       if(initial === 0){
//          console.log('if');
//          setItems(items => ({ ...items, ...data }));
//          setInitial(1);
//       }else{
//          console.log('else');
//          getAllDataInSystem().then(result => setItems(items => ({ ...items, ...result })));
//       }
//       // eslint-disable-next-line
//    }, []);

//    // console.log(incoming);
//    return {
//       _items,
//       initial
//    };

// };