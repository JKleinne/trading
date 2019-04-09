import {
    GET_COIN,
    GET_ALL_MULTI_PRICE,
    GET_HISTORICAL_DAILY,
    SET_COIN_TO_FETCH,
    GET_FIAT_CURRENCIES,
    GET_CRYPTO_CURRENCIES
} from '../actions/constants';
import {State} from "react-bootstrap/es/utils/StyleConfig";

export default (state = {coins: []}, action) => {
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

        case GET_FIAT_CURRENCIES:
            return  {
                ...state,
                fiat: action.payload.data
        };

        case GET_CRYPTO_CURRENCIES:
            return {
                ...state,
                crypto: action.payload.data
            };

        default:
            return state;
    }
}