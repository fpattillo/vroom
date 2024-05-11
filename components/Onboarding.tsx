import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { useSession } from "next-auth/react";
import changePassword from "../pages/api/users/changePassword";
import updateDocumentTypes from "../pages/api/users/updateDocumentTypes";

export default function Onboarding() {
  // step 0: change password form
  // step 1: checkboxes OC/HES to select document type
  const [step, setStep] = useState(0);
  const [oc, setOC] = useState(false);
  const [hes, setHES] = useState(false);
  const [password, setPassword] = useState("");
  const {data: session, status} = useSession();

  async function handleChangePassword() {
    setStep(1);
  }

  async function handleSubmitSettings() {
    const documentType = oc && hes ? "BOTH" : oc ? "OC" : hes ? "HES" : "NONE";
    fetch('/api/users/updateDocumentTypes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        docType: documentType,
        email: session.user.email,
      }),
    })
    .then(response => response.json())
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="flex flex-row w-screen h-1/2 justify-center items-center">
      {step === 0 && (
        <div className="flex flex-col gap-y-3">
          <h1>¡Bienvenido a FacturaScope!</h1>
          <p>Por favor, actualiza tu contraseña.</p>
          <input className="border-2 rounded-lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button disabled={password.length === 0} className={`${password.length === 0 ? 'bg-slate-300' : 'bg-blue-500 hover:bg-blue-700'} text-white py-2 px-4 rounded`} onClick={handleChangePassword}>Actualizar</button>
        </div>
      )}
      {step === 1 && (
        <div className="flex flex-col gap-y-3">
          <h1>Selecciona los documentos que deseas subir</h1>
          <div>
            <input type="checkbox" checked={oc} onChange={() => setOC(!oc)} id="oc"/>
            <label
              htmlFor="oc"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-3"
            >
              Orden de compra
            </label>
          </div>
          <div>
            <input type="checkbox" checked={hes} onChange={() => setHES(!hes)} id="hes"/>
            <label
              htmlFor="hes"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-3"
            >
              Hoja de entrada de servicios
            </label>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={handleSubmitSettings}>Subir documentos</button>
        </div>
      )}
    </div>
  )
}