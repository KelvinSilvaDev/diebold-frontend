import { format } from "date-fns";
import { get } from "mobx";
import React, { useEffect } from "react";
import Modal from "react-modal";

const IntegrationTable = ({ integrations, getStatusText }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedIntegration, setSelectedIntegration] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 3;
  
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return integrationList.slice(startIndex, endIndex);
  };
  

  const openModal = (integration) => {
    setSelectedIntegration(integration);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedIntegration([]);
    setModalIsOpen(false);
  };
  useEffect(() => {
    // Configura o elemento raiz do aplicativo para o `react-modal`
    Modal.setAppElement("#app");
  }, []);

  const integrationList = Array.isArray(integrations) ? integrations : [];

  return (
    <div>
      <table className="w-full mt-4 border rounded">
        <thead>
          <tr className=" text-black">
            <th className="px-4 py-2 text-left">Data HR Inicio</th>
            <th className="px-4 py-2 text-left">Data HR FIM</th>
            <th className="px-4 py-2 text-left">Status Download</th>
            <th className="px-4 py-2 text-left">Status Upload</th>
            <th className="px-4 py-2 text-center">Arquivos baixados</th>
            <th className="px-4 py-2 text-center">Enviados com sucesso</th>
            <th className="px-4 py-2 text-center">Erros</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {getCurrentPageItems().map((integration) => (
            <tr
              key={integration.idIntegration}
              className="border-b cursor-pointer hover:bg-cyan-100"
              onClick={() => openModal(integration.integrationTasks)}
            >
              <td className="px-4 py-2">
                {format(
                  new Date(integration.dateTimeStart),
                  "dd/MM/yyyy HH'h' mm'm' ss's'"
                )}
              </td>

              <td className="px-4 py-2">
                {format(
                  new Date(integration.dateTimeEnd),
                  "dd/MM/yyyy HH'h' mm'm' ss's'"
                )}
              </td>

              <td className="px-4 py-2">
              {getStatusText(integration.statusDownloads)}
              </td>
              <td className="px-4 py-2">
                {getStatusText(integration.statusUploads)}
              </td>
              <td className="px-4 py-2 text-center">
                {integration.quantityDownloadsInteg || 0}
              </td>
              <td className="px-4 py-2 text-center">
                {integration.quantityUploadsInteg || 0}
              </td>
              <td className="px-4 py-2 text-center">
                {
                  integration.tasksIntegration?.filter(
                    (task) => task.statusTask === 0 // O status 0 representa "Erros"
                  ).length
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination w-full flex gap-4 justify-end mt-2">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="hover:bg-cyan-100 cursor-pointer p-2 rounded-full"
          >
          Anterior
        </button>
        <span className="p-2">
          Página {currentPage} de {Math.ceil(integrationList.length / itemsPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(integrationList.length / itemsPerPage)}
          className="hover:bg-cyan-100 cursor-pointer p-2 rounded-full"
          
          
        >
          Próxima
        </button>
      </div>
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes da Integração"
        className="absolute max-h-[600px] overflow-y-scroll top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-none outline-none p-8 rounded-lg "
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
      >
        <h2 className="text-xl mb-4">Detalhes da Integração</h2>
        {/* Conteúdo do modal aqui */}
        <div className="px-0 py-4">
          <table className="w-full mt-4 border rounded">
            <thead>
              <tr className="text-black ">
                <th className="px-4 py-2 text-left border-l-neutral-500 border-solid ">
                  Tarefa
                </th>
                <th className="px-4 py-2 text-left border-l-neutral-500 border-solid ">
                  Status
                </th>
                <th className="px-24 py-2 text-center border-l-neutral-500 border-solid ">
                  Inicio
                </th>
                <th className="px-24 py-2 text-center border-l-neutral-500 border-solid ">
                  Fim
                </th>
                <th className="px-12 max-h-4 py-2 text-center border-l-neutral-500 border-solid ">
                  Máquina
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedIntegration.map((integration) => (
                <tr key={integration.idTask}>
                  <td className="p-4 text-center border-2  ">
                    {integration.taskName}
                  </td>
                  <td className="p-4 text-center border-2 border-l-neutral-500 border-solid ">
                    {getStatusText(integration.statusTask)}
                  </td>
                  <td className="p-4 text-center border-2 border-l-neutral-500 border-solid ">
                    {format(
                      new Date(integration.taskDateTimeStart),
                      "dd/MM/yyyy HH'h' mm'm' ss's'"
                    )}
                  </td>
                  <td className="p-4 text-center border-2 border-l-neutral-500 border-solid ">
                    {format(
                      new Date(integration.taskDateTimeEnd),
                      "dd/MM/yyyy HH'h' mm'm' ss's'"
                    )}
                  </td>
                  <td className="py-4 p-2 text-center border-2">
                    {integration.hostName}
                  </td>
                </tr>

                // <>
                //   <p>{integration.idIntegTask}</p>
                //   <p>{integration.idTask}</p>
                //   <p>{integration.statusTask}</p>
                //   <p>{integration.taskDateTimeEnd}</p>
                //   <p>{integration.taskName}</p>
                // </>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={closeModal}
          className="bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Fechar
        </button>
      </Modal>
    </div>
  );
};

export default IntegrationTable;
