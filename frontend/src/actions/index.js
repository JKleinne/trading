import axios from 'axios';
import _ from 'lodash';
import {
    GET_USER,
    ADD_USER,
    GET_ALL_MULTI_PRICE,
    GET_HISTORICAL_DAILY,
    SET_COIN_TO_FETCH,
    GET_COIN_TO_FETCH
} from './constants';

import config from '../config/config';

// User actions
export const addUser = (user) => {
    return async dispatch => {
    //await axios.post('', user);
    dispatch({ type: ADD_USER, payload: user });
}};

// Coin actions
export const getAllCoinPrices = () => {
    return async dispatch => {
        let coinsToFetch = _.join(config.coins, ',');

        let data = await axios.get(
            `${config.cc_call_url}/pricemultifull?fsyms=${coinsToFetch}&tsyms=CAD&api_key=${config.cc_apikey}`);
        dispatch({ type: GET_ALL_MULTI_PRICE, payload: data });
    }
};

export const getHistoricalDaily = (coin, dayLimit) => {
    return async dispatch => {
        let data = await axios.get(
            `${config.cc_call_url}/histoday?fsym=${coin}&tsym=CAD&limit=${dayLimit}&api_key=${config.cc_apikey}`);
        dispatch({ type: GET_HISTORICAL_DAILY, payload: data });
    }
};

export const setCoinToFetch = coin => {
    return dispatch => {
        dispatch({ type: SET_COIN_TO_FETCH, payload: coin === 'Ƀ' ? 'BTC' : coin })
    }
};