import { useContext, useEffect } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { ErrorContext } from '../../contexts/ErrorContext';

import { useApi } from '../../services/dataService';
import reducerTasks from '../../reducers/reducerTasks';
import useFormHook from '../../hooks/formHook';

export default function Login() {
    const { onLoginSubmit } = useContext(AuthContext);

    const { cleanError } = useContext(ErrorContext);

    const { login } = useApi();

    const { addUser } = reducerTasks();

    const { dispatch } = useContext(DataContext);

    const values = {
        email: '',
        password: ''
    };


    useEffect(() => {
        cleanError();
        // eslint-disable-next-line
    }, []);

    const {
        onSubmit,
        changeHandler,
    } = useFormHook(
        values,
        login,
        addUser,
        [dispatch],
        undefined,
        '/',
        onLoginSubmit
    );

    return (
        <section id="login-section" className="narrow">

            <h1 className="item">Login</h1>

            <div className="item padded align-center">

                <form className="aligned" onSubmit={onSubmit}>

                    <label>
                        <span>Email</span>
                        <input type="text" name="email" onChange={changeHandler} />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" name="password" onChange={changeHandler} />
                    </label>

                    <div className="align-center">
                        <input className="action" type="submit" value="Sign In" />
                    </div>

                </form>

            </div>

        </section>


    );
}