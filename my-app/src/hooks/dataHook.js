import { useEffect } from 'react';

export const useDataHook = (request, task, taskParam, requestParam) => {

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetch = async () => {
            try {
                let result;
                if (requestParam) {
                    result = await request(signal, ...requestParam);
                }else{
                    result = await request(signal);
                }
                task(...taskParam, result);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetch();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line     
    }, []);

};