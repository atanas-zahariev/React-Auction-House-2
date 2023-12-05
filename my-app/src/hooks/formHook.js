import { useState } from 'react';
import { useDataHook } from './dataHook';

const useFormHook = (initial, request, task, taskParam, id, adress, functionalParam,validationParams) => {

    const [formValue, setFormValue] = useState(initial);

    const changeHandler = (e) => {
        setFormValue(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const requestParam = [formValue];

    let validationValues = formValue;

    if(validationParams){
        validationValues = {...validationValues,...validationParams};
    }
    
    if (id) {
        requestParam.push(id);
    }

    const onSubmit = useDataHook(request, task, taskParam, requestParam, adress, validationValues, functionalParam);

    return {
        onSubmit,
        changeHandler,
        formValue
    };

};

export default useFormHook;