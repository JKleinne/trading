import {
    GET_COUNTRIES
} from '../actions/constants';

export default (state = {countries: []}, action) => {
    switch(action.type) {
        case GET_COUNTRIES:
            return {...state, countries: action.payload.data};

        default:
            return state;
    }
}