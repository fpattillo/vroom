import { FC } from "react";
import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import { FaEye } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { json } from "stream/consumers";
import prisma from "../../lib/prisma";

type Props = {};

const documents = [
  {
    id: 1,
    month: "Enero",
    dueDate: "2021-01-01",
    type: "Factura",
    status: "Pagado",
  },
  {
    id: 2,
    month: "Febrero",
    dueDate: "2021-02-01",
    type: "Factura",
    status: "Pendiente",
  },
  {
    id: 3,
    month: "Marzo",
    dueDate: "2021-03-01",
    type: "Factura",
    status: "Pendiente",
  },
  {
    id: 4,
    month: "Abril",
    dueDate: "2021-04-01",
    type: "Factura",
    status: "Pendiente",
  },
  {
    id: 5,
    month: "Mayo",
    dueDate: "2021-05-01",
    type: "Factura",
    status: "Completed",
  },
  {
    id: 6,
    month: "Junio",
    dueDate: "2021-06-01",
    type: "Factura",
    status: "Pendiente",
  },
  {
    id: 7,
    month: "Julio",
    dueDate: "2021-07-01",
    type: "Factura",
    status: "Pendiente",
  },
  {
    id: 8,
    month: "Agosto",
    dueDate: "2021-08-01",
    type: "Factura",
    status: "Pendiente",
  },
  {
    id: 9,
    month: "Septiembre",
    dueDate: "2021-09-01",
    type: "Factura",
    status: "Pendiente",
  },
  {
    id: 10,
    month: "Octubre",
    dueDate: "2021-10-01",
    type: "Factura",
    status: "Pendiente",
  },
  {
    id: 11,
    month: "Noviembre",
    dueDate: "2021-11-01",
    type: "Factura",
    status: "Pendiente",
  },
  {
    id: 12,
    month: "Diciembre",
    dueDate: "2021-12-01",
    type: "Factura",
    status: "Pendiente",
  },
];

export const getStaticProps = async (context) => {
  return {
    props: {},
  }
};

const Dashboard: FC<Props> = (props) => {
  const { data: session, status } = useSession();
  console.log({ session });
  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <h1 className=" font-bold text-xl">Oxxo client</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
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
            <div className="col-span-2">{document.status}</div>
            <div className="col-span-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Orden de compra
                <FaUpload className="inline-block ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
