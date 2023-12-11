import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useApi } from '../../hooks/dataService';
import { ErrorContext } from '../../context/ErrorContext';


export default function Error() {
    const navigate = useNavigate();

    const { cleanError, getError } = useContext(ErrorContext);

    const { onDelete } = useApi();

    function cancelDelete() {
        cleanError();
    }

    const { error } = useContext(ErrorContext);

    if (Array.isArray(error)) {
        return (
            <div className="error-box">
                <p>{error.join('\n')}</p>
            </div>
        );
    } else if (typeof error === 'string' && error.includes('Delete')) {
        const title = error.split('/');
        const id = title[title.length - 1];

        async function deleteItem() {
            try {
                await onDelete(id);
                navigate('/catalog');
            } catch (error) {
                getError(error);
            }
        }

        return (
            <div className="error-box">
                <p id='delete'><span style={{ fontSize: 20, fontWeight: 'bold' }}>Are you sure you want to delete {title[1]} </span>
                    <button onClick={deleteItem} className="error-box" style={{ color: 'white', padding: 5, fontWeight: 'bold', backgroundColor: 'red' }} >Confirm</button>
                    <button onClick={cancelDelete} className="error-box" style={{ color: 'white', padding: 5, fontWeight: 'bold', backgroundColor: 'red' }} >Cancel</button>
                </p>
            </div>
        );

    } else if (typeof error === 'string' && error !== '') {
        return (
            <div className="error-box">
                <p>{error}</p>
            </div>
        );
    } else if (typeof error === 'object') {
        return (
            <div className="error-box">
                <p>There seems to be a problem please try again later</p>
            </div>
        );
    }
}