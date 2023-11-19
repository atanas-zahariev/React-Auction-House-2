import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getUser, clearUser } from '../services/utility';
import { useContext } from 'react';


export const useRequest = () => {
    const navigate = useNavigate();

    const { onLogout } = useContext(AuthContext);

    const host = 'http://localhost:3030';

    const controller = new AbortController();
    
    async function request(method, url, data,signal) {
        const user = getUser();

        const options = {
            method,
            headers: {},
            signal:controller.signal
        };

        if(signal !== undefined){
            options.signal = signal;
        }

        if (user != null) {
            options.headers['X-Authorization'] = user;
        }

        if (data !== undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(host + url, options);
            let result;
            
            if (response.status !== 204) {
                result = await response.json();
            }
            
            if (response.ok === false) {
                
                if (response.status === 403) {
                    clearUser();
                }
                
                const err = result;
                
                throw err;
            }

            return result;


        } catch (error) {
            if (error[0] === 'Invalid authorization token') {
                localStorage.clear();
                onLogout();
                navigate('/login');
                return;
            }
            throw error;
        }
    }

    return {
        get: request.bind(null, 'get'),
        post: request.bind(null, 'post'),
        put: request.bind(null, 'put'),
        del: request.bind(null, 'delete'),
    };

};

