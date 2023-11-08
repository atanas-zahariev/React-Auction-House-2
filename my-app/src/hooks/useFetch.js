import { getUser } from '../services/utility';

export const useFetch = () => {

    async function getData() {
        const option = {
            headers: {}
        };

        const user = getUser();

        if (user != null) {
            option.headers['X-Authorization'] = user;
        }
        try {
            const response = await fetch('http://localhost:3030/house/catalog',option);

            let result;

            if (response.status !== 204) {
                result = await response.json();
            }

            if (response.ok === false) {

                const err = result;

                throw err;
            }

            return result;            
        } catch (error) {
            if (error[0] === 'Invalid authorization token') {
                throw error[0];
            }
            throw error;
        }
    }

    const wrapPromise = (promise) => {
        let status = 'pending';
        let result = '';
        let suspender = promise.then(
            (res) => {
                status = 'success';
                result = res;
            },
            (err) => {
                status = 'error';
                result = err;
            }
        );

        return {
            read() {
                if (status === 'pending') {
                    throw suspender;
                } else if (status === 'error') {
                    throw result;
                }

                return result;
            }
        };
    };

    const createResourse = () => {
        return {
            data: wrapPromise(getData())
        };
    };

    return { createResourse };
};