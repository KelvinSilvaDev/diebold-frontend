import React, { useState, useEffect } from "react";
import { useClientContext } from "../contexts/ClientContext";
import { getSetting, createSetting, updateSetting } from "../services/api";
import Modal from "react-modal";
import { DatePickerComponent } from "./DatePicker";
import { Form, Input, Select, Button, Space, Col, Row } from "antd";
import { CustomerSelector } from "./CustomerSelector";
import moment from "moment";
const { Option } = Select;

export const FormConfig = () => {
  const customer = useClientContext();
  const selectedClient = customer.selectedClient.idCustomer;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [form] = Form.useForm();
  
  const [editMode, setEditMode] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [formEnabled, setFormEnabled] = useState(false);

  

  const [protocolOptions, setProtocolOptions] = useState([
    "Protocol.Sftp",
    "Protocol.Http",
    "Protocol.Ssh",
  ]);

  const cleaningPeriodOptions = [
    { label: "Trimestral", value: 3 },
    { label: "Semestral", value: 6 },
    { label: "Anual", value: 12 },
  ];

  useEffect(() => {
    if (!selectedClient) {
      return;
    }

    async function fetchData() {
      try {
        const response = await getSetting(selectedClient);

        handleClientChange(selectedClient);
        if (response && response.length > 0) {
          const setting = response[0];
          const lastCleaningDate = setting.lastCleaning
            ? moment(setting.lastCleaning).format("YYYY-MM-DDTHH:mm:ss.SSS")
            : null;

          const bdLastCleaningDate = setting.bdLastCleaning
            ? moment(setting.bdLastCleaning).format("YYYY-MM-DDTHH:mm:ss.SSS")
            : null;
          const selectedCleaningPeriodOption = cleaningPeriodOptions.find(
            (option) => option.value === setting.bdCleaningperiod
          );

          form.setFieldsValue({
            originProtocol: setting.originProtocol,
            destinyProtocol: setting.destinyProtocol,
            originHostName: setting.originHostName,
            destinyHostName: setting.destinyHostName,
            originPortNumber: setting.originPortNumber,
            destinyPortNumber: setting.destinyPortNumber,
            originUserName: setting.originUserName,
            destinyUserName: setting.destinyUserName,
            originPassword: setting.originPassword,
            destinyPassword: setting.destinyPassword,
            destinySSHHostKey: setting.destinySSHHostKey,
            originSSHHostKey: setting.originSSHHostKey,
            originRemotePath: setting.originRemotePath,
            destinySetRemotePath: setting.destinySetRemotePath,
            setTasks: setting.setTasks,
            setBackDays: setting.setBackDays,
            sendBuf: setting.sendBuf,
            setDebug: setting.setDebug,
            setDebugLevel: setting.setDebugLevel,
            timeoutInMiliSecSession: setting.timeoutInMiliSecSession,
            cleaningEvery: setting.cleaningEvery,
            lastCleaning: lastCleaningDate,
            bdCleaningperiod: selectedCleaningPeriodOption
              ? selectedCleaningPeriodOption.value
              : null,
            bdLastCleaning: bdLastCleaningDate,
          });
          setEditMode(true);
        } else {
          setEditMode(false);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
      console.log(form.getFieldsValue());
    }

    fetchData();
  }, [selectedClient, form]);


  useEffect(()=>{
    setFormEnabled(false)
  },[selectedClient])

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreateOrUpdate = () => {
    if (editMode) {
      setModalIsOpen(true);
    } else {
      console.log(form.getFieldsValue());
      // createSetting(formData).then((response) => {
      //   // Lógica após a criação (por exemplo, redirecionar)
      // });
    }
  };

  const handleConfirmEdit = () => {
    const requestData = {
      idCustomer: selectedClient,
      originProtocol: form.getFieldValue("originProtocol"),
      destinyProtocol: form.getFieldValue("destinyProtocol"),
      originHostName: form.getFieldValue("originHostName"),
      destinyHostName: form.getFieldValue("destinyHostName"),
      originPortNumber: form.getFieldValue("originPortNumber"),
      destinyPortNumber: form.getFieldValue("destinyPortNumber"),
      originUserName: form.getFieldValue("originUserName"),
      destinyUserName: form.getFieldValue("destinyUserName"),
      originPassword: form.getFieldValue("originPassword"),
      destinyPassword: form.getFieldValue("destinyPassword"),
      destinySSHHostKey: form.getFieldValue("destinySSHHostKey"),
      originSSHHostKey: form.getFieldValue("originSSHHostKey"),
      originRemotePath: form.getFieldValue("originRemotePath"),
      destinySetRemotePath: form.getFieldValue("destinySetRemotePath"),
      setTasks: form.getFieldValue("setTasks"),
      setBackDays: form.getFieldValue("setBackDays"),
      sendBuf: form.getFieldValue("sendBuf"),
      setDebug: form.getFieldValue("setDebug"),
      setDebugLevel: form.getFieldValue("setDebugLevel"),
      timeoutInMiliSecSession: form.getFieldValue("timeoutInMiliSecSession"),
      cleaningEvery: parseInt(form.getFieldValue("cleaningEvery")),
      lastCleaning: new Date(form.getFieldValue("lastCleaning")),
      bdCleaningperiod: parseInt(form.getFieldValue("bdCleaningperiod")),
      bdLastCleaning: new Date(form.getFieldValue("bdLastCleaning")),
    };

    if (editMode) {
      // console.log("UPDATE SETTING")
      updateSetting(JSON.stringify(requestData)).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setEditMode(true);
          console.log(response.data.description);
          closeModal();
        }
      });
    } else {
      // console.log("CREATE SETTING")
      createSetting(JSON.stringify(requestData)).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setEditMode(true);
          closeModal();
          // alert(response.data.description)
        }
      });
    }
  };

  const editData = () => {
    const requestData = {
      idCustomer: selectedClient,
      originProtocol: form.getFieldValue("originProtocol"),
      destinyProtocol: form.getFieldValue("destinyProtocol"),
      originHostName: form.getFieldValue("originHostName"),
      destinyHostName: form.getFieldValue("destinyHostName"),
      originPortNumber: form.getFieldValue("originPortNumber"),
      destinyPortNumber: form.getFieldValue("destinyPortNumber"),
      originUserName: form.getFieldValue("originUserName"),
      destinyUserName: form.getFieldValue("destinyUserName"),
      originPassword: form.getFieldValue("originPassword"),
      destinyPassword: form.getFieldValue("destinyPassword"),
      destinySSHHostKey: form.getFieldValue("destinySSHHostKey"),
      originSSHHostKey: form.getFieldValue("originSSHHostKey"),
      originRemotePath: form.getFieldValue("originRemotePath"),
      destinySetRemotePath: form.getFieldValue("destinySetRemotePath"),
      setTasks: form.getFieldValue("setTasks"),
      setBackDays: form.getFieldValue("setBackDays"),
      sendBuf: form.getFieldValue("sendBuf"),
      setDebug: form.getFieldValue("setDebug"),
      setDebugLevel: form.getFieldValue("setDebugLevel"),
      timeoutInMiliSecSession: form.getFieldValue("timeoutInMiliSecSession"),
      cleaningEvery: parseInt(form.getFieldValue("cleaningEvery")),
      lastCleaning: new Date(form.getFieldValue("lastCleaning")),
      bdCleaningperiod: parseInt(form.getFieldValue("bdCleaningperiod")),
      bdLastCleaning: new Date(form.getFieldValue("bdLastCleaning")),
    };

    
  };

  const handleCancelEdit = () => {
    setConfirmationVisible(false);
    setModalIsOpen(false);
  };

  const toggleForm = () => {
    
    if (!editMode) {
      setFormEnabled(!formEnabled);
    }
  };

  const onFinish = (values) => {
    const lastCleaning = moment(form.getFieldValue("lastCleaning")).format(
      "YYYY-MM-DDTHH:mm:ss.SSSZ"
    );
    const bdLastCleaning = moment(form.getFieldValue("bdLastCleaning")).format(
      "YYYY-MM-DDTHH:mm:ss.SSSZ"
    );

    
    form.setFieldsValue({
      lastCleaning: lastCleaning,
      bdLastCleaning: bdLastCleaning,
    });

   

    // openModal();

  };

  const handleClientChange = () => {
    form.setFieldsValue({
      originProtocol: "",
      originHostName: "",
      originPortNumber: "",
      destinyHostName: "",
      originUserName: "",
      originPassword: "",
      originSSHHostKey: "",
      originRemotePath: "",
      destinyProtocol: "",
      destinyPortNumber: "",
      destinyUserName: "",
      destinyPassword: "",
      destinySSHHostKey: "",
      destinySetRemotePath: "",
      setTasks: "",
      setBackDays: "",
      sendBuf: "",
      setDebug: "",
      setDebugLevel: "",
      timeoutInMiliSecSession: "",
      cleaningEvery: "",
      lastCleaning: "",
      bdLastCleaning: "",
      bdCleaningperiod: "",
    });
  };

  useEffect(() => {
    Modal.setAppElement("#app");
  }, []);
  return (
    <>
      <div className="w-full flex justify-between">
        <Button
          type="primary"
          onClick={() => setFormEnabled(!formEnabled)}
          className="flex  flex-col items-center align-middle justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
        >
          {formEnabled ? "Desabilitar Formulário" : "Habilitar Formulário"}
        </Button>
        <CustomerSelector />
      </div>

        <hr className=" mt-2 mb-4" />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <h1 className="text-lg font-bold">Origem</h1>
        <hr className=" mt-2 mb-4" />
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Protocolo Origem"
              name="originProtocol"
              initialValue="FTP"
            >
              <Select disabled={!formEnabled}>
                {protocolOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Número da Porta Origem" name="originPortNumber">
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Usuário Origem" name="originUserName">
              <Input disabled={!formEnabled} />
            </Form.Item>
            <Form.Item label="Caminho Remoto Origem" name="originRemotePath">
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Senha Origem" name="originPassword">
              <Input disabled={!formEnabled} />
            </Form.Item>
            <Form.Item label="Chave SSH Origem" name="originSSHHostKey">
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Host Origem" name="originHostName">
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
        </Row>
        <h1 className="text-lg font-bold">Destino</h1>
        <hr className=" mt-2 mb-4" />
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Protocolo Destino"
              name="destinyProtocol"
              initialValue="FTP"
            >
              <Select disabled={!formEnabled}>
                {protocolOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Número da Porta Destino" name="destinyPortNumber">
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Usuário Destino" name="destinyUserName">
              <Input disabled={!formEnabled} />
            </Form.Item>
            <Form.Item
              label="Caminho Remoto Destino"
              name="destinySetRemotePath"
            >
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Senha Destino" name="destinyPassword">
              <Input disabled={!formEnabled} />
            </Form.Item>
            <Form.Item label="Chave SSH Destino" name="destinySSHHostKey">
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Host Destino" name="destinyHostName">
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
        </Row>

        <h1 className="text-lg font-bold">Tarefas</h1>
        <hr className=" mt-2 mb-4" />

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Tarefas" name="setTasks">
              <Input disabled={!formEnabled} />
            </Form.Item>

            <Form.Item label="Enviar Bônus" name="sendBuf">
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Dias Anteriores" name="setBackDays">
              <Input disabled={!formEnabled} />
            </Form.Item>
            <Form.Item label="Nível de Depuração" name="setDebugLevel">
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Depuração" name="setDebug">
              <Input disabled={!formEnabled} />
            </Form.Item>
            <Form.Item label="Tempo Limite (ms)" name="timeoutInMiliSecSession">
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
        </Row>
        <h1 className="text-lg font-bold">Limpeza</h1>
        <hr className=" mt-2 mb-4" />
        <Row gutter={16}>

          <Col span={6}>
            <Form.Item label="Data da Última Limpeza" name="lastCleaning">
              <DatePickerComponent
                format="DD/MM/YYYY"
                value={form.getFieldValue("lastCleaning")}
                disabled={!formEnabled}
                className="border-2 w-full rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Limpeza a Cada" name="cleaningEvery">
              <Input disabled={!formEnabled} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Data da Última Limpeza BD" name="bdLastCleaning">
              <DatePickerComponent
                format="DD/MM/YYYY"
                value={moment(form.getFieldValue("lastCleaning"))}
                disabled={!formEnabled}
                className="border-2 w-full rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Período de Limpeza BD" name="bdCleaningperiod">
              <Select disabled={!formEnabled}>
                {cleaningPeriodOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        

        <Row gutter={16}>
          <Col span={24} className="flex justify-end">
            <Form.Item>
            {editMode && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={editData}
                disabled={!formEnabled}
                className="flex  flex-col items-center align-middle justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
              >
                Editar
              </Button>
            )}
            {!editMode && (
              <Button
                type="primary"
                htmlType="submit"
                disabled={!formEnabled}
                className="flex  flex-col items-center align-middle justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
              >
                Criar
              </Button>
            )}
          </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes da Integração"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-none outline-none p-8 rounded-lg "
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
      >
        <h1>Confirma as alterações?</h1>
        <div className="flex justify-between">
          <Button onClick={handleConfirmEdit}>Sim</Button>
          <Button onClick={handleCancelEdit}>Não</Button>
        </div>
      </Modal>
    </>
  );
};
