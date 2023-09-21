// clientReducer.js

const initialState = {
  customers: []
}

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CUSTOMERS':
      return {
        ...state,
        customers: action.payload
      }
    default:
      return state
  }
}

export default clientReducer
