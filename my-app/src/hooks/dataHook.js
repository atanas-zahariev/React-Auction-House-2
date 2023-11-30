import { useContext } from 'react';
import { ErrorContext } from '../contexts/ErrorContext';
import { validationHook } from './validationHook';

export const useDataHook = (request, task, taskParam, requestParam, values, navigate, adress) => {
    console.log('here');
    const { getError } = useContext(ErrorContext);

    async function onSubmit(e) {
        e.preventDefault();
        try {
            if (values) {
                validationHook(values);
            }
            const result = await request(...requestParam);
            if (result) {
                task(...taskParam, result);
            } else {
                task(...taskParam);
            }
            if (navigate) {
                navigate(adress);
            }
        } catch (error) {
            console.log(error.message);
            console.log(error);
            getError(error);
        }
    }


    return onSubmit;

};