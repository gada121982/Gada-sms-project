import { combineReducers } from 'redux'
import contactReducer from './contactReducer'
import messageReducer from './messageReducer'
import stepReducer from './stepReducer'
import templateReducer from './templateReducer'

export default combineReducers({
  contactReducer,
  messageReducer,
  stepReducer,
  templateReducer
})