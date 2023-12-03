import { useState } from 'react';
import { useDataHook } from './dataHook';

const useFormHook = (initial, request, task, dispatch, adress, id,setAuth) => {

    const [formValue, setFormValue] = useState(initial);

    const changeHandler = (e) => {
        setFormValue(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const taskParam = [dispatch];
    const requestParam = [formValue];

    if (id) {
        taskParam.push(id);
        requestParam.push(id);
    }

    const onSubmit = useDataHook(request, task, taskParam, requestParam, adress, formValue,setAuth);

    return {
        onSubmit,
        changeHandler,
        formValue
    };

};

export default useFormHook;