import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorContext } from '../contexts/ErrorContext';

import { validationHook } from './validationHook';

export const useDataHook = (request, task, taskParam, requestParam, adress, values, setAuth) => {
    const navigate = useNavigate();
    
    const { getError } = useContext(ErrorContext);

    async function onSubmit(e) {
        if (e) {
            e.preventDefault();
        }
        try {
            if (values) {
                validationHook(values);
            }

            const result = await request(...requestParam);

            if (result) {
                taskParam.push(result);
            }

            if (task) {
                task(...taskParam);
            }

            if (adress) {
                navigate(adress);
            }

            if (setAuth) {
                setAuth();
            }
        } catch (error) {
            getError(error);
        }
    }

    return onSubmit;

};