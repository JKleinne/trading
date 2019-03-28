import {
    GET_COIN
} from '../actions/constants';

export default (state = {users: []}, action) => {
    switch(action.type) {
        case GET_COIN:
            return {...state, coins: action.payload};
            break;

        default:
            return state;
    }
}