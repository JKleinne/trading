import {
    GET_USER,
    ADD_USER,
    SET_USER_ID
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

        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload
        };

        default:
            return state;
    }
}