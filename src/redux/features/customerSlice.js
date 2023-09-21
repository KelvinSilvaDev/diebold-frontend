// customerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Define uma ação assíncrona para buscar clientes da API
export const getCustomersFromApi = createAsyncThunk('customers/getCustomersFromApi', async () => {
  try {
    const response = await axios.get('/api/customer')
    return response.data // Retorna os dados dos clientes
  } catch (error) {
    throw error
  }
})

export const getIntegrationsForSelectedClient = createAsyncThunk(
  'customers/getIntegrationsForSelectedClient',
  async selectedClientId => {
    try {
      const response = await axios.get(`/api/dashboard?idCustomer=${selectedClientId}`)
      return response.data // Retorna as integrações do cliente selecionado
    } catch (error) {
      throw error
    }
  }
)

// Cria um slice de reducer
const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    selectedClient: null,
    integrations: []
  },
  reducers: {
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload
    },
    setIntegrations: (state, action) => {
      state.integrations = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getCustomersFromApi.fulfilled, (state, action) => {
      state.customers = action.payload // Atualiza o estado com os dados recebidos
    })
    builder.addCase(getIntegrationsForSelectedClient.fulfilled, (state, action) => {
      state.integrations = action.payload // Atualiza o estado com as integrações do cliente selecionado
    })
  }
})

// Exporta os reducers e a ação assíncrona
export const { setSelectedClient, setIntegrations } = customerSlice.actions
export default customerSlice.reducer
