import React, { useState, useEffect } from 'react';
import { useClientContext } from '../contexts/ClientContext';
import { getSetting } from '../services/api';

export const OldFormConfig = () => {

  const customer = useClientContext()

  const selectedClient = customer.selectedClient.idCustomer


  const [formData, setFormData] = useState({
    idCustomer: selectedClient,
    protocol: 'FTP',
    hostName: '',
    portNumber: '',
    userName: '',
    password: '',
    destinySSHHostKey: '',
    originSSHHostKey: '',
    sshPrivateKeyPath: '',
    originRemotePath: '',
    destinySetRemotePath: '',
    setTasks: '',
    setBackDays: '',
    sendBuf: '',
    setDebug: '',
    setDebugLevel:'',
    timeoutInMiliSecSession: '',
    cleaningEvery: 0,
    lastCleaning: '', //datetime 1598-12-01
    manualUpload: false,
  });

  useEffect(()=> {


    getSetting(selectedClient).then((response) => {
      if(response) {
        setFormData(response[0])
      }
    })


  }, [selectedClient])


  useEffect(() => {
    setFormData({
      ...formData,
      idCustomer: selectedClient,
    });
  }, [selectedClient]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    const number = type === 'number'

    if (number) {
      newValue = parseInt(newValue);

    }
    
    setFormData({
        ...formData,
        [name]: newValue,
    });
  };

  const handleSubmit = () => {
    console.log(formData)
    console.log(new Date())
  }

  return (
    <form className="w-full h-full flex flex-col flex-1">
      <div className="grid grid-cols-3 gap-4 w-full bg-white ">
        <div className="col-span-1 items-start  justify-start gap-4">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="protocol"
          >
            Protocolo
          </label>
          <select
            name="protocol"
            id="protocol"
            onChange={handleChange}
            value={formData.protocol}
            className="border-2 w-full py-2 rounded-lg"
          >
            <option value="FTP">FTP</option>
            <option value="HTTP">HTTP</option>
            <option value="SSH">SSH</option>
          </select>
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="hostName"
          >
            Host
          </label>
          <input
            type="text"
            id="hostName"
            name="hostName"
            value={formData.hostName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="portNumber"
          >
            Número da Porta
          </label>
          <input
            type="number"
            id="portNumber"
            name="portNumber"
            value={formData.portNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="userName"
          >
            Usuário
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="destinySSHHostKey"
          >
            Chave Destino SSH do Host
          </label>
          <input
            type="text"
            id="destinySSHHostKey"
            name="destinySSHHostKey"
            value={formData.destinySSHHostKey}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="originSSHHostKey"
          >
            Chave Origem SSH do Host
          </label>
          <input
            type="text"
            id="originSSHHostKey"
            name="originSSHHostKey"
            value={formData.originSSHHostKey}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="sshPrivateKeyPath"
          >
            Caminho da Chave SSH Privada
          </label>
          <input
            type="text"
            id="sshPrivateKeyPath"
            name="sshPrivateKeyPath"
            value={formData.sshPrivateKeyPath}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="originRemotePath"
          >
            Caminho Remoto de Origem
          </label>
          <input
            type="text"
            id="originRemotePath"
            name="originRemotePath"
            value={formData.originRemotePath}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="destinySetRemotePath"
          >
            Definir Destino do Caminho Remoto
          </label>
          <input
            type="text"
            id="destinySetRemotePath"
            name="destinySetRemotePath"
            value={formData.destinySetRemotePath}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="setTasks"
          >
            Definir Tarefas
          </label>
          <input
            type="text"
            id="setTasks"
            name="setTasks"
            value={formData.setTasks}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="setBackDays"
          >
            Definir dias Anteriores
          </label>
          <input
            type="number"
            id="setBackDays"
            name="setBackDays"
            value={formData.setBackDays}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="sendBuf"
          >
            Enviar Bonus
          </label>
          <input
            type="text"
            id="sendBuf"
            name="sendBuf"
            value={formData.sendBuf}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="setDebug"
          >
            Definir Depuração
          </label>
          <input
            type="text"
            id="setDebug"
            name="setDebug"
            value={formData.setDebug}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="setDebugLevel"
          >
            Definir Nível de Depuração
          </label>
          <input
            type="text"
            id="setDebugLevel"
            name="setDebugLevel"
            value={formData.setDebugLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="col-span-1 mt-4">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="timeoutInMiliSecSession"
          >
            Tempo Limite (ms)
          </label>
          <input
            type="number"
            id="timeoutInMiliSecSession"
            name="timeoutInMiliSecSession"
            value={formData.timeoutInMiliSecSession}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mt-4">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="cleaningEvery"
          >
            Limpeza a Cada (minutes)
          </label>
          <input
            type="number"
            id="cleaningEvery"
            name="cleaningEvery"
            value={formData.cleaningEvery}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mt-4">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="lastCleaning"
          >
            Última Limpesa
          </label>
          <input
            type="date"
            id="lastCleaning"
            name="lastCleaning"
            value={formData.lastCleaning}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div></div>
        <div className="mt-4 flex items-baseline gap-2 align-center justify-start  content-center ">
          <label
            className="block text-gray-700 text-xl font-bold mb-0"
            htmlFor="manualUpload"
          >
            Upload Manual
          </label>
          <input
            type="checkbox"
            id="manualUpload"
            name="manualUpload"
            checked={formData.manualUpload}
            onChange={handleChange}
            className="form-checkbox h-8 w-8 mt-0 text-blue-600"
          />
        </div>
        
        <div className="mt-4 w-full flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>

  );
};


