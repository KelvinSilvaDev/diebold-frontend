// rootReducer.js

import { combineReducers } from 'redux'
import clientReducer from './clientReducer'

const rootReducer = combineReducers({
  client: clientReducer
  // Outros reducers, se houver
})

export default rootReducer
