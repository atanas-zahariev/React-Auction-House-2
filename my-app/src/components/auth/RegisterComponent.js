import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { ErrorContext } from '../../contexts/ErrorContext';
import { DataContext } from '../../contexts/DataContext';

import { useApi } from '../../services/dataService';
import { validationHook } from '../../hooks/validationHook';

export default function Register() {
  const { onRegisterSubmit } = useContext(AuthContext);

  const { getError, cleanError } = useContext(ErrorContext);

  const { register } = useApi();

  const { dispatch } = useContext(DataContext);

  const [values, setValues] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    repass: '',
  });



  const navigate = useNavigate();

  useEffect(() => {

    cleanError();
    // eslint-disable-next-line
  }, []);



  function getFormValue(e) {
    setValues(state => ({ ...state, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      validationHook(values);
      const result = await register(values);
      dispatch({ type: 'USER', user: result });
      onRegisterSubmit();
      navigate('/');
    } catch (error) {
      getError(error);
    }
  }

  return (
    <section id="register-section" className="narrow">

      <h1 className="item">Register</h1>

      <div className="item padded align-center">

        <form className="aligned" onSubmit={onSubmit} >

          <label>
            <span>Email</span>
            <input type="text" name="email" onChange={getFormValue} />
          </label>
          <label>
            <span>First name</span>
            <input type="text" name="firstname" onChange={getFormValue} />
          </label>
          <label>
            <span>Last name</span>
            <input type="text" name="lastname" onChange={getFormValue} />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" onChange={getFormValue} />
          </label>
          <label>
            <span>Repeat Password</span>
            <input type="password" name="repass" onChange={getFormValue} />
          </label>

          <div className="align-center">
            <input className="action" type="submit" value="Create Account" />
          </div>

        </form>

      </div>

    </section>
  );
}