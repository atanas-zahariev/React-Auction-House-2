import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorContext } from '../../contexts/ErrorContext';
import { DataContext } from '../../contexts/DataContext';

export default function CloseOffer() {
    const { id } = useParams();

    const{getUserAction} = useContext(DataContext);

    const navigate = useNavigate();


    const { getError } = useContext(ErrorContext);

    useEffect(() => {
        async function fetchData() {
            try {
                await getUserAction(id);
                navigate('/closed');
            } catch (error) {              
                getError(error);
            }
        }
        fetchData();
    });

}