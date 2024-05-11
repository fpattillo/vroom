import { useSession } from "next-auth/react";
import { FC } from "react";
import { FaEye } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

type Props = {};

const documents = [
  {
    id: 1,
    month: "Enero",
    dueDate: "2024-01-01",
    type: "Orden de Compra, HES",
    status: "sent",
  },
  {
    id: 2,
    month: "Febrero",
    dueDate: "2024-02-01",
    type: "Orden de Compra, HES",
    status: "pending",
  },
  {
    id: 3,
    month: "Marzo",
    dueDate: "2024-03-01",
    type: "Orden de Compra, HES",
    status: "pending",
  },
  {
    id: 4,
    month: "Abril",
    dueDate: "2024-04-01",
    type: "Orden de Compra, HES",
    status: "pending",
  },
  {
    id: 5,
    month: "Mayo",
    dueDate: "2024-05-01",
    type: "Orden de Compra, HES",
    status: "pending",
  },
  {
    id: 6,
    month: "Junio",
    dueDate: "2024-06-01",
    type: "Orden de Compra, HES",
    status: "pending",
  },
  {
    id: 7,
    month: "Julio",
    dueDate: "2024-07-01",
    type: "Orden de Compra, HES",
    status: "pending",
  },
  {
    id: 8,
    month: "Agosto",
    dueDate: "2024-08-01",
    type: "Orden de Compra, HES",
    status: "pending",
  },
  {
    id: 9,
    month: "Septiembre",
    dueDate: "2024-09-01",
    type: "Orden de Compra, HES",
    status: "pending",
  },
  {
    id: 10,
    month: "Octubre",
    dueDate: "2024-10-01",
    type: "Orden de Compra, HES",
    status: "pending",
  },
  {
    id: 11,
    month: "Noviembre",
    dueDate: "2024-11-01",
    type: "Orden de Compra, HES",
    status: "pending",
  },
  {
    id: 12,
    month: "Diciembre",
    dueDate: "2024-12-01",
    type: "Orden de Compra, HES",
    status: "pending",
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

const DashboardTable: FC<Props> = (props) => {
  const { data, status } = useSession();
  if (status === "loading" || !data) return null;
  const user = data?.user as User;
  
  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className=" font-bold text-xl">{user.company}</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => window.open(user.pandadoc, "_blank")}
        >
          View contract
          <FaEye className="inline-block ml-2" />
        </button>
      </div>
      <div className="border-gray-300 shadow-xl border-[1px] rounded-xl my-2">
        <div className="grid grid-cols-10 p-2">
          <div className="col-span-2 font-bold">Mes</div>
          <div className="col-span-2 font-bold">Fecha límite</div>
          <div className="col-span-2 font-bold">Tipo</div>
          <div className="col-span-2 font-bold">Estado</div>
          <div className="col-span-2 font-bold">Acciones</div>
        </div>
        {documents.map((document) => (
          <div
            key={document.id}
            className="grid grid-cols-10 border-gray-300 border-t-[1px] p-2"
          >
            <div className="col-span-2">{document.month}</div>
            <div className="col-span-2">{document.dueDate}</div>
            <div className="col-span-2">{document.type}</div>
            <div className="col-span-2">
              {document.status === "sent" && (
                <>
                <FaCheck className="inline-block text-green-500" />
                <span className="m-2">Enviado</span>
                </>
              )}
              {document.status === "pending" &&
                new Date(document.dueDate) >= new Date() && (
                  <>
                    <FaRegClock className="inline-block text-yellow-500" />
                    <span className="m-2">Pendiente</span>
                  </>
                )}
              {document.status === "pending" &&
                new Date(document.dueDate) < new Date() && (
                  <>
                  <FaRegClock className="inline-block text-red-500" />
                  <span className="m-2">Atrasado</span>
                  </>
                )}
            </div>
            <div className="col-span-2">
              {document.status === "pending" && (
                <div className="flex flex-row gap-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded">
                    Orden de compra
                    <FaUpload className="inline-block ml-2" />
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded">
                    HES
                    <FaUpload className="inline-block ml-2" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardTable;
