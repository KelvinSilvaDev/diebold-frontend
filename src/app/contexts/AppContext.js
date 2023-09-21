// AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [selectedClient, setSelectedClient] = useState(null)
  const [integrations, setIntegrations] = useState([])

  useEffect(() => {
    // Aqui você pode adicionar a lógica para carregar as integrações quando o cliente for selecionado.
    // Certifique-se de chamar setIntegrations para atualizar o estado.
  }, [selectedClient])

  return (
    <AppContext.Provider value={{ selectedClient, setSelectedClient, integrations, setIntegrations }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
