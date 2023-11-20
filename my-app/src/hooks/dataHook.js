import { useEffect } from 'react';

export const DataHook = (request, task, taskParam, requestParam) => {
    console.log('here');
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetch = async () => {
            try {
                let result;
                if (requestParam) {
                    console.log('if');
                    result = await request(...requestParam, signal);
                } else {
                    result = await request(signal);
                }
                task(...taskParam, result);
            } catch (error) {
                console.log(error.message);
                console.log(error);
            }
        };
        fetch();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line     
    }, []);

};