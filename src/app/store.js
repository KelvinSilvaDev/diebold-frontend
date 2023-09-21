import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers' // Importe seu root reducer

const store = createStore(
  combineReducers({
    client: rootReducer // Certifique-se de que a chave 'client' corresponda ao nome do seu cliente no estado
    // Outros reducers, se houver
  }),
  applyMiddleware(thunk)
)

export default store
