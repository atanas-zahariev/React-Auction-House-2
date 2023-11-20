export default function reducerTasks() {
    const getCatlogList = (dispatch, result) => {
        dispatch({ type: 'FETCH_SUCCESS', result });

    };

    const setBider = (dispatch, id, result) => {
        dispatch({ type: 'UPDATE_BIDER', id: id, updatedItem: result.updatedItem });
    };

    const updateItem = (dispatch, id, oldItem) => {
        dispatch({ type: 'UPDATE_BIDER', id: id, updatedItem: oldItem });
    };

    const createItem = (dispatch,result) => {
        dispatch({type:'ADD_ITEM',result:result});
    };

    const removeProductFromList = (dispatch,_id) => {
        dispatch({type:'REMOVE_ITEM',id:_id});
    };


    return {
        getCatlogList,
        setBider,
        updateItem,
        createItem,
        removeProductFromList
    };
}