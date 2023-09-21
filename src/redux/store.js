import { configureStore } from '@reduxjs/toolkit'
import customersReducer from './features/customerSlice'

const store = configureStore({
  reducer: {
    customers: customersReducer
  }
})

export default store
