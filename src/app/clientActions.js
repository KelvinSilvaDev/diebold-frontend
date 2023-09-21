// clientActions.js

import { getCustomers } from './services/api'

// Ação para buscar clientes e armazená-los no estado do Redux
export const fetchCustomers = () => {
  return async dispatch => {
    try {
      const customers = await getCustomers()
      // Dispatch da ação para armazenar os clientes no estado
      dispatch(setCustomers(customers))
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
    }
  }
}

// Ação para definir os clientes no estado do Redux
export const setCustomers = customers => {
  return {
    type: 'SET_CUSTOMERS',
    payload: customers
  }
}
