import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorContext } from '../../contexts/ErrorContext';
import { DataContext } from '../../contexts/DataContext';

import { useApi } from '../../services/dataService';
import reducerTasks from '../../reducers/reducerTasks';

export default function CloseOffer() {
    const { id } = useParams();
    
    const {dispatch} = useContext(DataContext);

    const {removeProductFromList} = reducerTasks();

    const{getUserAction} = useApi();

    const navigate = useNavigate();


    const { getError } = useContext(ErrorContext);

    useEffect(() => {
        async function fetchData() {
            try {
                await getUserAction(id);
                removeProductFromList(dispatch,id);
                navigate('/closed');
            } catch (error) {              
                getError(error);
            }
        }
        fetchData();
    });

}