import {
    GET_USER,
    ADD_USER,
    GET_USER_WALLETS
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

        default:
            return state;
    }
}