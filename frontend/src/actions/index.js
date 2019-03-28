import axios from 'axios';
import _ from 'lodash';
import {
    GET_USER,
    ADD_USER,
    GET_ALL_MULTI_PRICE
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
            `${config.cryptoCompare_CALL_URL}/pricemultifull?fsyms=${coinsToFetch}&tsyms=CAD&api_key=${config.cryptoCompare_APIKEY}`);
        dispatch({ type: GET_ALL_MULTI_PRICE, payload: data });
    }
};