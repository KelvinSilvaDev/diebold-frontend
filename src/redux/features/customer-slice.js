import { getCustomers } from '@/app/services/api'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { action } from 'mobx'

const initialState = {
  customers: [],
  selectedClient: null,
  integrations: []
}

export const getCustomersFromApi = createAsyncThunk('customers/getCustomersFromApi', async () => {
  try {
    const response = await getCustomers()
    const data = response.data
    return data // Retorne os dados dos clientes
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    throw error // Lança o erro novamente para que possa ser tratado em algum lugar
  }
})

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: []
  },
  reducers: {
    // ...outros reducers
  },
  extraReducers: builder => {
    builder.addCase(getCustomersFromApi.fulfilled, (state, action) => {
      state.customers = action.payload // Atualize o estado com os dados recebidos
    })
  }
})

// export const customers = createSlice({
//   name: 'customers',
//   initialState,
//   reducers: {
//     getCustomersFromApi: async (state, action) => {
//       try {
//         const customers = await getCustomers()
//         state.customers = customers
//       } catch (error) {
//         console.error('Erro ao buscar clientes:', error)
//       }
//     },

//     setSelectedClient: (state, action) => {
//       state.selectedClient = action.payload
//     },
//     setIntegrations: (state, action) => {
//       state.integrations = action.payload
//     }
//   }
// })

// export const { setSelectedClient, setIntegrations } = customers.actions
export default customerSlice.reducer
