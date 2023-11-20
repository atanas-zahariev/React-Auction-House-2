import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { ErrorContext } from '../../contexts/ErrorContext';

import { useApi } from '../../services/dataService';

export default function Login() {
    const { onLoginSubmit } = useContext(AuthContext);

    const { getError, cleanError } = useContext(ErrorContext);

    const { login } = useApi();

    const { dispatch } = useContext(DataContext);


    const values = useRef({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        cleanError();
        // eslint-disable-next-line
    }, []);



    function getFormValue(e) {
        values.current[e.target.name] = e.target.value;
    }

    async function onSubmit(e) {
        e.preventDefault();

        if (Object.values(values.current).some(x => !x)) {
            getError(['All fields are required']);
            return;
        }

        try {
            const result = await login(values.current);
            dispatch({ type: 'USER', user: result });
            onLoginSubmit();
            navigate('/');
        } catch (error) {
            getError(error);
        }
    }

    return (
        <section id="login-section" className="narrow">

            <h1 className="item">Login</h1>

            <div className="item padded align-center">

                <form className="aligned" onSubmit={onSubmit}>

                    <label>
                        <span>Email</span>
                        <input type="text" name="email" onChange={getFormValue} />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" name="password" onChange={getFormValue} />
                    </label>

                    <div className="align-center">
                        <input className="action" type="submit" value="Sign In" />
                    </div>

                </form>

            </div>

        </section>


    );
}