import {
    GET_USER,
    ADD_USER
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
                payload: action.payload
            };

        default:
            return state;
    }
}