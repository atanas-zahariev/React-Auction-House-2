import { useState } from 'react';
import { useDataHook } from './dataHook';

const useFormHook = (initial, request, task, dispatch, adress, id, setAuth,validationParams) => {

    const [formValue, setFormValue] = useState(initial);

    const changeHandler = (e) => {
        setFormValue(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const taskParam = [dispatch];

    const requestParam = [formValue];

    let validationValues = formValue;

    if(validationParams){
        validationValues = {...validationValues,...validationParams};
    }
    if (id) {
        taskParam.push(id);
        requestParam.push(id);
    }

    const onSubmit = useDataHook(request, task, taskParam, requestParam, adress, validationValues, setAuth);

    return {
        onSubmit,
        changeHandler,
        formValue
    };

};

export default useFormHook;