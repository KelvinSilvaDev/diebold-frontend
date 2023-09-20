import { useClientContext } from "../contexts/ClientContext"

export function CustomerSelector() {
    const customer = useClientContext()
    const handleChangeCustomer = (e) => {
        const selectedCustomerId = parseInt(e.target.value);
        const selectedCustomer = customer.customerList.find(
          (customer) => customer.idCustomer === selectedCustomerId
        );
        customer.setSelectedClient(selectedCustomer);
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
            value={customer.selectedClient.idCustomer || ""}
            onChange={(e) => handleChangeCustomer(e)}
            className="border rounded-md py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
                {customer.customerList.map((customer) => (
                    <option key={customer.idCustomer} value={customer.idCustomer}>
                    {customer.customerName}
                    </option>
                ))}
            </select>
        </div>
    )
}