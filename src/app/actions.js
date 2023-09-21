export const setSelectedClient = client => ({
  type: 'SET_SELECTED_CLIENT',
  payload: client
})

// Ação para definir as integrações
export const setIntegrations = integrations => ({
  type: 'SET_INTEGRATIONS',
  payload: integrations
})
