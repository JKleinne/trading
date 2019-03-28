import { combineReducers } from 'redux'
import users from './users'
import coins from './coins'

export default combineReducers({
    users,
    coins
})