import axios from 'axios';
import _ from 'lodash';
import {
    ADD_USER,
    GET_ALL_MULTI_PRICE,
    GET_HISTORICAL_DAILY,
    SET_COIN_TO_FETCH,
    GET_HISTORICAL_HOURLY,
    SET_OHCLV_MODE,
    GET_COIN_TO_FETCH,
    GET_COUNTRIES,
    GET_FIAT_CURRENCIES,
    GET_CRYPTO_CURRENCIES,
    SET_USER_ID
} from './constants';

import config from '../config/config';

/*
 * Countries Actions
 */
export const getCountries = () => {
    return async dispatch => {
        let countries = await axios.get('http://localhost:8000/countries/getCountries');
        dispatch({type: GET_COUNTRIES, payload: countries});
    }
};

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
        if(coin === 'Ƀ')
            coin = 'BTC';
        else if(coin === 'Ł')
            coin = 'LTC';

        let data = await axios.get(
            `${config.cc_call_url}/histoday?fsym=${coin}&tsym=CAD&limit=${dayLimit}&api_key=${config.cc_apikey}`);
        dispatch({ type: GET_HISTORICAL_DAILY, payload: data });
    }
};

export const getHistoricalHourly = (coin, dayLimit) => {
    return async dispatch => {
        if(coin === 'Ƀ')
            coin = 'BTC';
        else if(coin === 'Ł')
            coin = 'LTC';

        let data = await axios.get(
            `${config.cc_call_url}/histohour?fsym=${coin}&tsym=CAD&limit=${dayLimit}&api_key=${config.cc_apikey}`);
        dispatch({ type: GET_HISTORICAL_HOURLY, payload: data })
    }
};

export const setCoinToFetch = coin => {
    return dispatch => {
        if(coin === 'Ƀ')
            coin = 'BTC';
        else if(coin === 'Ł')
            coin = 'LTC';

        dispatch({ type: SET_COIN_TO_FETCH, payload: coin });
    }
};

export const setOHCLVMode = (mode) => {
    return dispatch => dispatch({type: SET_OHCLV_MODE, payload: mode});
};

export const getFiatCurrencies = () => {
    return async dispatch => {
        let fiat = await axios.get('http://localhost:8000/currencies/getFiatCurrencies');

        dispatch({type:GET_FIAT_CURRENCIES, payload: fiat })
    }
}

export const getCryptoCurrencies =() => {
    return async dispatch => {
        let crypto = await axios.get('http://localhost:8000/currencies/getCryptoCurrencies');

        dispatch({type:GET_CRYPTO_CURRENCIES, payload: crypto })
    }
};

export const setUserId = user_id => {
  return async dispatch => {
      let userId = await axios.get(`http://localhost:8000/users/getUser/${user_id}`);

      dispatch({type:SET_USER_ID, payload: userId })
  }
};