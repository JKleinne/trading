import {
    GET_COIN,
    GET_ALL_MULTI_PRICE,
    GET_HISTORICAL_DAILY,
    SET_COIN_TO_FETCH,
    GET_HISTORICAL_HOURLY,
    SET_OHCLV_MODE
} from '../actions/constants';

export default (state = {coins: [], coinToFetch: 'BTC', ohclvMode: 'monthly'}, action) => {
    switch(action.type) {
        case GET_COIN:
            return {...state, coins: action.payload};

        case GET_ALL_MULTI_PRICE:
            return {
                ...state,
                coinCurrent: action.payload.data.DISPLAY
            };

        case GET_HISTORICAL_DAILY:
            return {
                ...state,
                coinHistorical: action.payload.data.Data
            };

        case SET_COIN_TO_FETCH:
            return {
                ...state,
                coinToFetch: action.payload
            };

        case GET_HISTORICAL_HOURLY:
            return {
                ...state,
                coinHistorical: action.payload.data.Data
            };

        case SET_OHCLV_MODE:
            return {
                ...state,
                ohclvMode: action.payload
            };

        default:
            return state;
    }
}