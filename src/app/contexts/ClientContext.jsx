import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCustomers } from '../services/api';

const ClientContext = createContext();



export function ClientProvider({ children }) {
  const [selectedClient, setSelectedClient] = useState({
    idCustomer: 1,
    customerName: "Santander",
    customerDescription: "Banco Santander",
    integration: null,
    integrations: [
      {
        idIntegration: 1,
        idCustIntegration: 1,
        statusIntegration: 0,
        dateTimeStart: "2023-07-18T13:22:39.853",
        dateTimeEnd: "2023-07-18T13:22:39.853",
        task: null,
        tasksIntegration: [
          {
            idTask: 22,
            idIntegTask: 1,
            taskName: "DOWNLOAD",
            statusTask: 2,
            taskDateTimeStart: "2023-07-18T15:27:50.43",
            taskDateTimeEnd: "2023-07-18T15:27:50.43",
          },
          {
            idTask: 23,
            idIntegTask: 1,
            taskName: "UPLOAD",
            statusTask: 2,
            taskDateTimeStart: "2023-07-18T15:27:50.43",
            taskDateTimeEnd: "2023-07-18T15:27:50.43",
          },
        ],
      },
      {
        idIntegration: 4,
        idCustIntegration: 1,
        statusIntegration: 0,
        dateTimeStart: "2023-07-18T15:27:42.717",
        dateTimeEnd: "2023-07-18T15:27:42.717",
        task: null,
        tasksIntegration: [
          {
            idTask: 28,
            idIntegTask: 4,
            taskName: "DOWNLOAD",
            statusTask: 0,
            taskDateTimeStart: "2023-07-18T15:27:50.43",
            taskDateTimeEnd: "2023-07-18T15:27:50.43",
          },
          {
            idTask: 29,
            idIntegTask: 4,
            taskName: "UPLOAD",
            statusTask: 0,
            taskDateTimeStart: "2023-07-18T15:27:50.43",
            taskDateTimeEnd: "2023-07-18T15:27:50.43",
          },
        ],
      },
    ],
  });
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customers = await getCustomers();
        setCustomerList(customers);

        // 2 - Seleciona o primeiro cliente da lista como o cliente inicial
        if (customers.length > 0) {
          setSelectedClient(customers[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <ClientContext.Provider value={{ selectedClient, setSelectedClient, customerList }} displayName="Client Context">
      {children}
    </ClientContext.Provider>
  );
}

export function useClientContext() {
  return useContext(ClientContext);
}
