import { useContext } from 'react';

import { ErrorContext } from '../../contexts/ErrorContext';

export default function Error() {
    const { error } = useContext(ErrorContext);

    if (Array.isArray(error)) {
        return (
            <div className="error-box">
                <p>{error.join('\n')}</p>
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