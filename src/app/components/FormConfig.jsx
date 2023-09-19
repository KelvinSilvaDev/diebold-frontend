import React, { useState, useEffect } from 'react';
import { useClientContext } from '../contexts/ClientContext';
import { getSetting, createSetting, updateSetting } from '../services/api';
import Modal from "react-modal";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
export const FormConfig = () => {
  const customer = useClientContext();
  const selectedClient = customer.selectedClient.idCustomer;


  const [modalIsOpen, setModalIsOpen] = useState(false); // Estado do modal

  const [formData, setFormData] = useState({
    Protocol: '',
    HostName: '',
    PortNumber: '',
    UserName: '',
    Password: '',
    DestinySSHHostKey: '',
    OriginSSHHostKey: '',
    SshPrivateKeyPath: '',
    OriginRemotePath: '',
    DestinySetRemotePath: '',
    SetTasks: '',
    SetBackDays: '',
    SendBuf: '',
    SetDebug: '',
    SetDebugLevel: '',
    TimeoutinMiliSecSession: '',
    CleaningEvery: 0,
    LastCleaning: '', // Será um campo de data
    BdLastCleaning: '', // Será um campo de data
  });

  const [editMode, setEditMode] = useState(false); // Modo de edição
  const [confirmationVisible, setConfirmationVisible] = useState(false); // Caixa de confirmação


  const protocolOptions = [
    { value: 'FTP', label: 'FTP' },
    { value: 'HTTP', label: 'HTTP' },
    { value: 'SSH', label: 'SSH' },
  ];

  // Opções para o dropdown "Limpeza"
  const cleaningEveryOptions = [
    { value: '3', label: 'Trimestral' },
    { value: '6', label: 'Semestral' },
    { value: '12', label: 'Anual' },
  ];


  useEffect(() => {
    if (!selectedClient) {
      return; // Não faz nada se o cliente não estiver selecionado
    }

    async function fetchData() {
      try {
        const response = await getSetting(selectedClient);
        if (response && response.length > 0) {
            const setting = response[0];
          setFormData({
            Protocol: setting.protocol,
            CleaningEvery: setting.cleaningEvery.toString(), // Converte para string
            HostName: setting.hostName,
            PortNumber: setting.portNumber,
            UserName: setting.userName,
            Password: setting.password,
            DestinySSHHostKey: setting.destinySSHHostKey,
            OriginSSHHostKey: setting.originSSHHostKey,
            SshPrivateKeyPath: setting.sshPrivateKeyPath,
            OriginRemotePath: setting.originRemotePath,
            DestinySetRemotePath: setting.destinySetRemotePath,
            SetTasks: setting.setTasks,
            SetBackDays: setting.setBackDays,
            SendBuf: setting.sendBuf,
            SetDebug: setting.setDebug,
            SetDebugLevel: setting.setDebugLevel,
            TimeoutinMiliSecSession: setting.timeoutInMiliSecSession,
            LastCleaning: new Date(setting.lastCleaning), // Formata a data
            BdLastCleaning: new Date(setting.bdLastCleaning),

          });
          setEditMode(true); // Ativa o modo de edição se houver dados
        } else {
          setEditMode(false); // Desativa o modo de edição se não houver dados
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, [selectedClient]);

  useEffect(() => {
    // Configura o elemento raiz do aplicativo para o `react-modal`
    Modal.setAppElement("#app");
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreateOrUpdate = () => {
    if (editMode) {
      // Se estiver no modo de edição, exibe a caixa de confirmação
      setModalIsOpen(true);
    } else {
      // Se estiver no modo de criação, cria o novo item
      console.log(formData);
      // createSetting(formData).then((response) => {
      //   // Lógica após a criação (por exemplo, redirecionar)
      // });
    }
  };

  const handleConfirmEdit = () => {
    // Confirma a edição e executa a lógica de atualização
    console.log(formData);
    // updateSetting(selectedClient, formData).then((response) => {
    //   // Lógica após a atualização (por exemplo, redirecionar)
    // });
    setConfirmationVisible(false); // Fecha a caixa de confirmação
  };

  const handleCancelEdit = () => {
    setConfirmationVisible(false); // Cancela a edição e fecha a caixa de confirmação
    setModalIsOpen(false);
  };

  const handleEditClick = (fieldName) => {
    setEditMode({
      ...editMode,
      [fieldName]: !editMode[fieldName],
    });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // Atualiza o campo CleaningEvery com base no BdCleaningperiod selecionado
      CleaningEvery: value === '3' ? 3 : value === '6' ? 6 : value === '12' ? 12 : 0,
    }));
  };

  const handleDateChange = (fieldName, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: date, // Armazenar a data selecionada
    }));
  };


  const renderDropdown = (fieldName, label, options) => (
    <div className="col-span-1">
      <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor={fieldName}>
        {label}
      </label>
      <select
        name={fieldName}
        id={fieldName}
        onChange={handleDropdownChange}
        value={formData[fieldName]}
        className="border-2 w-full py-2 rounded-lg"
        disabled={!editMode[fieldName]}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => handleEditClick(fieldName)}
        className="mt-2 text-blue-600"
      >
        {editMode[fieldName] ? 'Desabilitar Edição' : 'Habilitar Edição'}
      </button>
    </div>
  );


  const handleChange = (e) => {
    // Se o modo de edição estiver desabilitado, não faça nada
    if (!editMode[e.target.name]) {
      return;
    }
  
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    const number = type === 'number';
  
    if (number) {
      newValue = parseInt(newValue);
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const renderInputField = (fieldName, label) => (
    <div className="col-span-1">
      <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor={fieldName}>
        {label}
      </label>
      <input
        type="text"
        id={fieldName}
        name={fieldName}
        value={formData[fieldName]}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${editMode[fieldName] ? '' : 'bg-gray-200'}`}
        disabled={!editMode[fieldName]}
      />
      <button
        type="button"
        onClick={() => handleEditClick(fieldName)}
        className="mt-2 text-blue-600"
      >
        {editMode[fieldName] ? 'Desabilitar Edição' : 'Habilitar Edição'}
      </button>
    </div>
  );


  const renderDatePicker = (fieldName, label) => (
    <div className="col-span-1">
      <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor={fieldName}>
        {label}
      </label>
      <DatePicker
        selected={formData[fieldName]} // Valor selecionado do DatePicker
        onChange={(date) => handleDateChange(fieldName, date)} // Manipulador de mudança de data
        dateFormat="dd/MM/yyyy" // Formato da data
        className={`border-2 w-full py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${!editMode[fieldName] ? 'bg-gray-200' : ''}`}
        disabled={!editMode[fieldName]}
      />
      <button
        type="button"
        onClick={() => handleEditClick(fieldName)}
        className="mt-2 text-blue-600"
      >
        {editMode[fieldName] ? 'Desabilitar Edição' : 'Habilitar Edição'}
      </button>
    </div>
  );


  return (
    <form className="w-full h-full grid grid-cols-3 gap-4">
        {renderDropdown('Protocol', 'Protocolo', protocolOptions)}
      {renderDropdown('CleaningEvery', 'Limpeza a Cada (minutes)', cleaningEveryOptions)}
      {renderInputField('HostName', 'Host')}
      {renderInputField('PortNumber', 'Número da Porta')}
      {renderInputField('UserName', 'Usuário')}
      {renderInputField('Password', 'Senha')}
      {renderInputField('DestinySSHHostKey', 'Chave Destino SSH do Host')}
      {renderInputField('OriginSSHHostKey', 'Chave Origem SSH do Host')}
      {renderInputField('SshPrivateKeyPath', 'Caminho da Chave SSH Privada')}
      {renderInputField('OriginRemotePath', 'Caminho Remoto de Origem')}
      {renderInputField('DestinySetRemotePath', 'Definir Destino do Caminho Remoto')}
      {renderInputField('SetTasks', 'Definir Tarefas')}
      {renderInputField('SetBackDays', 'Definir dias Anteriores')}
      {renderInputField('SendBuf', 'Enviar Bonus')}
      {renderInputField('SetDebug', 'Definir Depuração')}
      {renderInputField('SetDebugLevel', 'Definir Nível de Depuração')}
      {renderInputField('TimeoutinMiliSecSession', 'Tempo Limite (ms)')}
      {renderInputField('CleaningEvery', 'Limpeza a Cada (minutes)')}
        {renderDatePicker('LastCleaning', 'Última Limpeza')}
        {/* {renderDatePicker('BdLastCleaning', 'Período de Limpeza')} */}

      <div className="col-span-3 mt-4 w-full flex justify-end">
        {editMode ? (
          <>
            <button
              type="button"
              onClick={handleCreateOrUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
            >
              Editar
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleCreateOrUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
          >
            Criar
          </button>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmação de Edição"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-none outline-none p-8 rounded-lg "
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
      >
        <div className="mt-2">
          <p>Tem certeza de que deseja editar?</p>
          <button type="button" onClick={handleConfirmEdit}>
            Sim
          </button>
          <button type="button" onClick={handleCancelEdit}>
            Cancelar
          </button>
        </div>
      </Modal>
    </form>
  );
};
