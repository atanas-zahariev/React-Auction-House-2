import { useContext } from 'react';
import { ErrorContext } from '../contexts/ErrorContext';
import { validationHook } from './validationHook';
import { useNavigate } from 'react-router-dom';

export const useDataHook = (request, task, taskParam, requestParam, adress, values) => {
    console.log('here');
    const { getError } = useContext(ErrorContext);
    const navigate = useNavigate();
    async function onSubmit(e) {
        if(e){
            e.preventDefault();
        }
        try {
            if (values) {
                validationHook(values);
            }
            const result = await request(...requestParam);
            console.log(result);
            if (result) {
                taskParam.push(result);
            }

            task(...taskParam);

            if (adress) {
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