"use client"
// CustomerSelector.js

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCustomers } from '../clientActions';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomersFromApi, setSelectedClient, setIntegrations, getIntegrationsForSelectedClient } from '@/redux/features/customerSlice';


export default function CustomerSelector() {
    const customers = useSelector((state) => state.customers.customers);
    const selectedClient = useSelector((state) => state.customers.selectedClient); // Adicione esta linha para obter o cliente selecionado
    const dispatch = useDispatch();

  useEffect(() => {
    // Ao montar o componente, buscar os clientes da API e armazená-los no estado Redux
    dispatch(getCustomersFromApi());
  }, []);

  useEffect(() => {
    if (selectedClient) {
      // Disparar a ação para buscar as integrações quando selectedClient mudar
      dispatch(getIntegrationsForSelectedClient(selectedClient));
    } else {
      // Limpar as integrações se nenhum cliente estiver selecionado
      dispatch(setIntegrations([]));
    }
  }, [selectedClient]);


  const handleClientChange = (e) => {
    console.log('Cliente selecionado:', e.target.value);
    const selectedClientId = e.target.value;
    dispatch(setSelectedClient(selectedClientId)); // Atualize o cliente selecionado no estado Redux
  };
  
   

  return (
    <div className="flex items-center gap-4">
        <label
        htmlFor="clients"
        className="block text-gray-700 font-semibold mb-2"
        >
            Clientes:
        </label>
        <select
        id="clients"
        onChange={e => handleClientChange(e)}
        value={selectedClient || ''}
        className="border rounded-md py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
            <option value="">Selecione um cliente</option>
            {customers && customers.map((customer) => (
                <option key={customer.idCustomer} value={customer.idCustomer}>
                {customer.customerName}
                </option>
            ))}
        </select>
    </div>
  );
}

