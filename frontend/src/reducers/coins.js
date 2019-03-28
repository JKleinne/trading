import {
    GET_COIN,
    GET_ALL_MULTI_PRICE
} from '../actions/constants';

export default (state = {users: []}, action) => {
    switch(action.type) {
        case GET_COIN:
            return {...state, coins: action.payload};

        case GET_ALL_MULTI_PRICE:
            return {...state, coins: action.payload.data};

        default:
            return state;
    }
}