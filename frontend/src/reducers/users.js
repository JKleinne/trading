import {
    GET_USER,
    ADD_USER,
    GET_USER_WALLETS,
    GET_USER_LIST,
    SET_ROLE,
    GET_USER_TRANSACTIONS
} from '../actions/constants';

export default (state = {}, action) => {
    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                posts: action.payload
            };

        case ADD_USER:
            return {
                ...state,
                users: action.payload
            };

        case GET_USER_WALLETS:
            return {
                ...state,
                wallets: action.payload.data
            };

        case GET_USER_LIST:
            return {
                ...state,
                userList: action.payload.data
            };

        case SET_ROLE:
            return {
                ...state,
                role: action.payload
            };

        case GET_USER_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload.data
            };

        default:
            return state;
    }
}