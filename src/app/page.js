'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR' // Importe o idioma desejado

import 'react-datepicker/dist/react-datepicker.css'
// import styles from "./page.module.css";
import { useClientContext } from './contexts/ClientContext'
import { CustomerSelector } from './components/CustomerSelector'
import IntegrationTable from './components/IntegrationTable'
import { getCustomers, getCustomerIntegrations } from './services/api'

const inter = Inter({ subsets: ['latin'] })

registerLocale('pt-BR', ptBR) // Registre o idioma
setDefaultLocale('pt-BR')

export default function Home() {
  const [currentCustomer, setCurrentCustomer] = useState({})
  const [integrations, setIntegrations] = useState([])
  const [selectedDateFilter, setSelectedDateFilter] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [enviados, setEnviados] = useState(0)
  const [erros, setErros] = useState(0)
  const [downloading, setDownloading] = useState(0)
  const [maquinasSemFR, setMaquinasSemFR] = useState(0)

  const cliente = useClientContext()

  useEffect(() => {
    const fetchIntegrations = async customerId => {
      try {
        const fetchedIntegrations = await getCustomerIntegrations(customerId)
        // 4 - Sobrescreve todo o cliente.selectedClient com as novas integrações
        setCurrentCustomer(fetchedIntegrations)
      } catch (error) {
        console.error('Erro ao obter as integrações:', error)
      }
    }

    if (cliente.selectedClient && cliente.selectedClient.idCustomer) {
      fetchIntegrations(cliente.selectedClient.idCustomer)
    }
  }, [cliente.selectedClient])

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customers = await getCustomers()

        if (customers.length > 0) {
          setSelectedClient(customers[0])
        }

        setCustomerList(customers)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCustomers()
  }, [])

  const calculateDownloading = tasksIntegration => {
    if (!tasksIntegration) return 0
    return tasksIntegration.filter(task => task.statusTask === 1).length
  }

  const getStatusText = statusIntegration => {
    if (statusIntegration === 2) {
      return 'Finalizado'
    } else if (statusIntegration === 1) {
      return 'Em andamento'
    } else if (statusIntegration === 0) {
      return 'Erro/Cancelado'
    } else {
      return 'Desconhecido'
    }
  }

  const calculateIntegrationStatus = integrations => {
    const statusCount = {
      finalizado: 0,
      emAndamento: 0,
      erroCancelado: 0,
      desconhecido: 0
    }

    integrations.forEach(integration => {
      if (integration.statusIntegration === 2) {
        statusCount.finalizado++
      } else if (integration.statusIntegration === 1) {
        statusCount.emAndamento++
      } else if (integration.statusIntegration === 0) {
        statusCount.erroCancelado++
      } else {
        statusCount.desconhecido++
      }
    })

    return statusCount
  }

  const handleExportToExcel = () => {
    if (currentCustomer.integrations.length === 0) {
      console.error('Não há dados para exportar.')
      return
    }

    if (!cliente.selectedClient) {
      console.error('Cliente não selecionado. Não é possível exportar CSV.')
      return
    }

    const csvData = []
    // Adicione um cabeçalho para cada coluna
    csvData.push([
      'Cliente',
      'Data de Início',
      'Data de Término',
      'Status Download',
      'Status Upload',
      'Arquivos baixados',
      'Enviados com sucesso',
      'Erros'
      // Adicione mais cabeçalhos aqui, se necessário
    ])

    currentCustomer.integrations.forEach(integration => {
      const { statusIntegration, statusUpload, tasksIntegration, dateTimeStart, dateTimeEnd } = integration

      const rowData = [
        currentCustomer.customerName, // Nome do cliente
        format(new Date(dateTimeStart), 'dd/MM/yyyy'), // Data de início
        format(new Date(dateTimeEnd), 'dd/MM/yyyy'), // Data de término
        getStatusText(statusIntegration),
        getStatusText(statusUpload),
        tasksIntegration?.length || 0,
        calculateEnviados(tasksIntegration),
        calculateErros(tasksIntegration)
        // Adicione mais dados das colunas aqui, se necessário
      ]
      csvData.push(rowData)
    })

    const downloadCSV = (data, filename) => {
      const csvContent = 'data:text/csv;charset=utf-8,' + data.map(row => row.join(',')).join('\n')
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', filename)
      document.body.appendChild(link) // Required for Firefox
      link.click()
    }

    downloadCSV(csvData, `${currentCustomer.customerName} - ${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}`)
  }

  const handleDateChange = (date, dateType) => {
    if (dateType === 'start') {
      setStartDate(date)
    } else if (dateType === 'end') {
      setEndDate(date)
    }
  }
  const calculateEnviados = integrations => {
    if (!integrations) return 0

    let totalEnviados = 0
    integrations.forEach(integration => {
      // Verifique se tasksIntegration é um array antes de usar o filter
      if (Array.isArray(integration.tasksIntegration)) {
        totalEnviados += integration.tasksIntegration.filter(
          task => task.statusTask === 2 && task.taskName === 'UPLOAD'
        ).length
      }
    })

    return totalEnviados
  }

  const calculateErros = integrationList => {
    if (!integrationList) return 0
    return integrationList.filter(integration => integration.statusIntegration === 0).length
  }

  const calculateErrosByStatus = (tasksIntegration, status) => {
    if (!tasksIntegration) return 0
    return tasksIntegration.filter(task => task.statusTask === status).length
  }

  const calculateErrosByStatusAndTaskName = (tasksIntegration, status, taskName) => {
    if (!tasksIntegration) return 0
    return tasksIntegration.filter(task => task.statusTask === status && task.taskName === taskName).length
  }

  const filterIntegrationsByDate = (integrations, startDate, endDate) => {
    // Se não houver datas selecionadas, retornar todas as integrações
    if (!startDate && !endDate) {
      return integrations
    }

    // Filtrar as integrações com base nas datas de início e fim
    return integrations.filter(integration => {
      const integrationDate = new Date(integration.dateTimeStart)

      // Se houver apenas a data de início, verificar se a data da integração é maior ou igual à data de início
      if (startDate && !endDate) {
        return integrationDate >= startDate
      }

      // Se houver apenas a data de fim, verificar se a data da integração é menor ou igual à data de fim
      if (!startDate && endDate) {
        return integrationDate <= endDate
      }

      // Se houver ambas as datas, verificar se a data da integração está dentro do intervalo
      return integrationDate >= startDate && integrationDate <= endDate
    })
  }

  const filteredIntegrations = filterIntegrationsByDate(currentCustomer.integrations, startDate, endDate)
  return (
    <main className="mx-auto flex flex-col flex-1  align-middle justify-center max-w-full w-ful">
      <div className="w-full h-full flex-1 flex-col flex">
        <div className="p-4 flex-1 ">
          {cliente.selectedClient && (
            <section className="bg-white rounded-md shadow-md p-8 mb-8">
              <div className="flex items-center">
                <div className="flex w-full">
                  <h2 className="text-2xl font-semibold mb-4 flex gap-2">
                    Status da Integração:{' '}
                    <span className="text-sm font-semibold bg-slate-600 text-white p-2 rounded-xl">
                      {currentCustomer.statusIntegrationCustomer}
                    </span>
                  </h2>
                </div>
                <div className="flex align-middle justify-end items-end w-full bg-white px-8 py-4">
                  <ul className="flex align-middle justify-center items-center mb-0">
                    <li className="flex align-middle justify-center items-center gap-4">
                      <CustomerSelector />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col items-center bg-[#17a7ff] p-4">
                  <p className="text-white font-semibold">Baixados</p>
                  <p className="text-white text-3xl">{currentCustomer.quantityDownloadsCust}</p>
                </div>
                <div className="flex flex-col items-center bg-[#00b2a9] p-4">
                  <p className="text-white font-semibold">Enviados</p>
                  <p className="text-white text-3xl">{currentCustomer.quantityUploadsCust}</p>
                </div>
                <div className="flex flex-col items-center bg-[#004b87] p-4">
                  <p className="text-white font-semibold">Baixados com Erro</p>
                  <p className="text-white text-3xl">{currentCustomer.quantityDownloadError}</p>
                </div>
                <div className="flex flex-col items-center bg-[#007a87] p-4">
                  <p className="text-white font-semibold">Enviados com Erro</p>
                  <p className="text-white text-3xl">{currentCustomer.quantityUploadError}</p>
                </div>
              </div>
              <div className="flex flex-col items-center bg-[#808285] p-4">
                <p className="text-white font-semibold">Máquinas sem FR maior que 10 dias</p>
                <p className="text-white text-3xl">{currentCustomer.quantityHostsNoFr}</p>
              </div>
            </section>
          )}
          <section>
            <div className="flex mb-4 w-full justify-between">
              <div className="flex w-full space-x-2 align-middle items-center">
                <DatePicker
                  selected={startDate}
                  onChange={date => handleDateChange(date, 'start')}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Data de início"
                  dateFormat="dd/MM/yyyy"
                  className="flex-1 border rounded-md py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <span className="flex items-center px-2 text-gray-800">até</span>
                <DatePicker
                  selected={endDate}
                  onChange={date => handleDateChange(date, 'end')}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Data de fim"
                  dateFormat="dd/MM/yyyy"
                  className="flex-1 border rounded-md py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <button
                className="flex-shrink-0  bg-[#004b87] hover:bg-[#0e3b61] text-white font-bold py-2 px-4 rounded"
                onClick={handleExportToExcel}
              >
                Exportar Excel
              </button>
            </div>

            {currentCustomer?.integrations?.length === 0 ? (
              <p className="text-red-500 mb-8">Não há integrações para o cliente selecionado.</p>
            ) : (
              <IntegrationTable
                integrations={filteredIntegrations}
                getStatusText={getStatusText}
                calculateEnviados={calculateEnviados}
                calculateErros={calculateErros}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
