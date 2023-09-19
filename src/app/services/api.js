// services/api.js

import axios from 'axios'
import { mockCustomer, mockSantander, mockBradesco, mockBb } from '../mocks/mockData'

// const API_URL = "https://localhost:44312"; // Coloque a URL da API real aqui
const API_URL = '/api' // Coloque a URL da API real aqui

const handleError = error => {
  if (error.response && error.response.status === 500) {
    console.error('Erro na requisição da API:', error.message)
    return true
  }
  return false
}

const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customer`)
    return response.data
  } catch (error) {
    if (handleError(error)) {
      console.log('Requisição à API falhou. Retornando dados do mock...')
      return mockCustomer // Utilizando o mock de clientes em caso de erro
    }
    throw error
  }
}

const getSetting = async customerId => {
  try {
    const response = await axios.get(`${API_URL}/setting?idCustomer=${customerId}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const updateSetting = async (customerId, data) => {
  try {
    const response = await axios.put(`${API_URL}/setting?idCustomer=${customerId}`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getConfig = async () => {
  try {
    const response = await axios.get(`${API_URL}/setting`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const sendConfig = async () => {
  try {
    const response = await axios.post(`${API_URL}/settings`)
  } catch (error) {
    console.log(error)
  }
}

const getCustomerIntegrations = async customerId => {
  try {
    const response = await axios.get(`${API_URL}/dashboard?idCustomer=${customerId}`)
    return response.data
  } catch (error) {
    if (handleError(error)) {
      console.log('Requisição à API falhou. Retornando dados do mock...')

      // Utilizando os mocks de clientes específicos em caso de erro
      if (customerId === 1) {
        return mockSantander
      } else if (customerId === 2) {
        return mockBradesco
      } else if (customerId === 3) {
        return mockBb
      }
    }
    throw error
  }
}

export { getCustomers, getCustomerIntegrations, getSetting, updateSetting }
