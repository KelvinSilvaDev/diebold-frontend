// reducer.js

const initialState = {
  selectedClient: null,
  integrations: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CLIENT':
      return {
        ...state,
        selectedClient: action.payload
      }
    case 'SET_INTEGRATIONS':
      return {
        ...state,
        integrations: action.payload
      }
    default:
      return state
  }
}

export default rootReducer
