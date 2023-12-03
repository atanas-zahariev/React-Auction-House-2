import { useContext, useEffect } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { ErrorContext } from '../../contexts/ErrorContext';

import { useApi } from '../../services/dataService';
import reducerTasks from '../../reducers/reducerTasks';
import useFormHook from '../../hooks/formHook';

export default function Register() {
  const { onRegisterSubmit } = useContext(AuthContext);
  
  const { dispatch } = useContext(DataContext);

  const { cleanError } = useContext(ErrorContext);

  const { register } = useApi();

  const { addUser } = reducerTasks();

  const values = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    repass: '',
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
    register,
    addUser,
    dispatch,
    '/',
    undefined,
    onRegisterSubmit
  );

  return (
    <section id="register-section" className="narrow">

      <h1 className="item">Register</h1>

      <div className="item padded align-center">

        <form className="aligned" onSubmit={onSubmit} >

          <label>
            <span>Email</span>
            <input type="text" name="email" onChange={changeHandler} />
          </label>
          <label>
            <span>First name</span>
            <input type="text" name="firstname" onChange={changeHandler} />
          </label>
          <label>
            <span>Last name</span>
            <input type="text" name="lastname" onChange={changeHandler} />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" onChange={changeHandler} />
          </label>
          <label>
            <span>Repeat Password</span>
            <input type="password" name="repass" onChange={changeHandler} />
          </label>

          <div className="align-center">
            <input className="action" type="submit" value="Create Account" />
          </div>

        </form>

      </div>

    </section>
  );
}