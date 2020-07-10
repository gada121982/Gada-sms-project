import { combineReducers } from 'redux'
import contactReducer from './contact'
import transactionReducer from './transaction'

console.log(transactionReducer)

export default combineReducers({
  contactReducer,
  transactionReducer
})