export default function dataReducer(initial, action) {
    switch (action.type) {
        case 'FETCH_SUCCESS': {
            return { ...initial, ...action.result };
        }
        case 'USER': {
            return { ...initial, user: action.user };
        }
        case 'LOGOUT': {
            return { items: initial.items };
        }
        case 'UPDATE_BIDER': {
            return { ...initial, items: initial.items.map(x => x._id === action.id ? action.updatedItem : x) };
        }
        case 'ADD_ITEM': {
            console.log(action.result);
            return { ...initial, items: [...initial.items, action.result] };
        }
        case 'REMOVE_ITEM': {
            return { ...initial, items: initial.items.filter(x => x._id !== action.id) };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}