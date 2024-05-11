import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";

type Props = {};

const clients = [
  {
    id: 1,
    name: "Oxxo",
    orders: 3,
    amount: 1000,
    currency: "USD",
  },
  {
    id: 2,
    name: "Coca Cola",
    orders: 2,
    amount: 2000,
    currency: "USD",
  },
  {
    id: 3,
    name: "Cliente 3",
    orders: 1,
    amount: 3000,
    currency: "BR",
  },
  {
    id: 4,
    name: "Transvip",
    orders: 1,
    amount: 10,
    currency: "UF",
  },
  {
    id: 5,
    name: "Cliente 5",
    orders: 0,
    amount: 0,
    currency: "USD",
  },
  {
    id: 6,
    name: "Cliente 6",
    orders: 0,
    amount: 80,
    currency: "USD",
  },
  {
    id: 7,
    name: "Cliente 7",
    orders: 20,
    amount: 100,
    currency: "MXN",
  },
  {
    id: 8,
    name: "Cliente 8",
    orders: 4,
    amount: 200,
    currency: "USD",
  },
  {
    id: 9,
    name: "Cliente 9",
    orders: 1,
    amount: 20,
    currency: "UF",
  },
  {
    id: 10,
    name: "Cliente 10",
    orders: 1,
    amount: 100,
    currency: "USD",
  },
];

type User = {
  name: string;
  email: string;
  image: any;
  id: string;
  theme: string;
  company: string;
  role: string;
  document_type: string;
  subscription_type: string;
  period: number;
  amount: number;
  pandadoc: string;
  currency: string;
  first_log_in: boolean;
};

const AdminDashboardTable: FC<Props> = (props) => {
  const { data, status } = useSession();
  if (status === "loading" || !data) return null;
  const user = data?.user as User;
  const [search, setSearch] = useState("");
  // if (user.role !== "admin") {
  //   document.location.href = "/admin-dashboard";
  //   return;
  // }

  return (
    <>
      <form className="flex items-center max-w-sm mx-auto">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search branch name..."
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      <div className="border-gray-300 shadow-xl border-[1px] rounded-xl my-2">
        <div className="grid grid-cols-10 p-4">
          <div className="col-span-2 font-bold">Cliente</div>
          <div className="col-span-2 font-bold">
            Ordenes de compra atrasadas
          </div>
          <div className="col-span-2 font-bold">Monto</div>
          <div className="col-span-2 font-bold">Currency</div>
          <div className="col-span-2 font-bold">Acciones</div>
        </div>
        {clients.filter((client) => client.name.includes(search)).map((client) => (
          <div
            key={client.id}
            className="grid grid-cols-10 p-4 border-gray-300 border-t-[1px]"
          >
            <div className="col-span-2">{client.name}</div>
            <div className="col-span-2">{client.orders}</div>
            <div className="col-span-2">{client.amount}</div>
            <div className="col-span-2">{client.currency}</div>
            <div className="col-span-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={() => window.open(user.pandadoc, "_blank")}
              >
                Enviar recordatorio
                <FaPaperPlane className="inline-block ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDashboardTable;
