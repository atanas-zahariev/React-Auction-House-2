import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { ErrorContext } from '../../context/ErrorContext';

import { useApi } from '../../hooks/dataService';
import { validationHook } from '../../hooks/validationHook';
import { formHandller } from '../../services/utility';


export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const { getError, cleanError } = useContext(ErrorContext);
    const { login } = useApi();

    useEffect(() => {
        cleanError();
        // eslint-disable-next-line
    }, []);

    const userLogin = async (data) => {
        try {
            validationHook(data);
            await login(data);
            setUser();
            navigate('/');
        } catch (error) {
            getError(error);
        }
    };

    const onSubmut = formHandller(userLogin);

    return (
        <section id="login-section" className="narrow">

            <h1 className="item">Login</h1>

            <div className="item padded align-center">

                <form className="aligned" onSubmit={onSubmut} >

                    <label>
                        <span>Email</span>
                        <input type="text" name="email" />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" name="password" />
                    </label>

                    <div className="align-center">
                        <input className="action" type="submit" value="Sign In" />
                    </div>

                </form>

            </div>

        </section>


    );
}