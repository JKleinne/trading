import axios from 'axios';
import {
    GET_USER,
    ADD_USER
} from './constants';

export const addUser = (user) => {
    return async dispatch => {
    //await axios.post('', user);
    dispatch({ type: ADD_USER, payload: user });
}};

//TODO Practice example
export const getPosts = () => {
    return async dispatch => {
        const posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({ type: GET_USER, payload: posts.data});
    }
};
