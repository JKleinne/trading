import { combineReducers } from 'redux'
import users from './users'
import coins from './coins'
import countries from './countries'

export default combineReducers({
    users,
    coins,
    countries
})