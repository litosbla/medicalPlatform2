import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import React, { useEffect, useState } from 'react'
Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function CitaController({sedeAtual,onchanging}:{sedeAtual:string,onchanging:(citaId:any)=>void}) {
    const [citas,setCitas] = useState<Array<Schema["Citas"]["type"]>>([]);
    
    function listCitas() {
        client.models.Citas.observeQuery(
            {
                filter: {
                    sedeId: {
                        eq: sedeAtual
                    }
                }
            }
        ).subscribe({
          next: (data) => setCitas([...data.items]),
        });}
    useEffect(() => { 
        listCitas();
        }, [sedeAtual]);
    console.log(citas)
  return (
    <div className="p-4">
    {citas.length > 0 ? (
      <select 
        onChange={(e) => onchanging(e.target.value)}
        className="w-full p-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-black"
        defaultValue=""
      >
        <option value="" disabled>Selecciona una Cita</option>
        {citas.map((cita) => (
          <option 
            key={cita.otp} 
            value={cita.otp}
          >
            {cita.estado} - {cita.fecha} - {cita.otp}
          </option>
        ))}
      </select>
    ) : (
      <div className="text-gray-500">loading</div>
    )}
  </div>
  )
}

