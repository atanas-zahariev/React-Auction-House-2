import { useContext, useEffect } from 'react';
import { useApi } from '../../hooks/dataService';
import { AuthContext } from '../../context/AuthContext';
import { ErrorContext } from '../../context/ErrorContext';
import { useNavigate } from 'react-router-dom';
import { validationHook } from '../../hooks/validationHook';
import { formHandller } from '../../services/utility';

export default function Register(){
    const {register} = useApi();
    const {setUser} = useContext(AuthContext);
    const {getError,cleanError} = useContext(ErrorContext);
    const navigate = useNavigate();

    useEffect(() => {
        cleanError();
        // eslint-disable-next-line
    }, []);
    
    const onRegister = async (data) => {
      try {
        validationHook(data);
        await register(data);
        setUser();
        navigate('/');
      } catch (error) {
        getError(error);
      }
    };

    const onSubmit = formHandller(onRegister);

    return (
        <section id="register-section" className="narrow">
    
          <h1 className="item">Register</h1>
    
          <div className="item padded align-center">
    
            <form className="aligned" onSubmit={onSubmit} >
    
              <label>
                <span>Email</span>
                <input type="text" name="email"  />
              </label>
              <label>
                <span>First name</span>
                <input type="text" name="firstname"  />
              </label>
              <label>
                <span>Last name</span>
                <input type="text" name="lastname"  />
              </label>
              <label>
                <span>Password</span>
                <input type="password" name="password"  />
              </label>
              <label>
                <span>Repeat Password</span>
                <input type="password" name="repass"  />
              </label>
    
              <div className="align-center">
                <input className="action" type="submit" value="Create Account" />
              </div>
    
            </form>
    
          </div>
    
        </section>
      );
}