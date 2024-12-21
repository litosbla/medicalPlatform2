
'use client'

import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import React, { useEffect, useState } from 'react'


Amplify.configure(outputs);

interface SedeControllerProps {
    /** ID de la empresa */
    nit: string;
    /** Función callback que se ejecuta cuando cambia la sede seleccionada */
    onchanging: (sedeId: any) => void;
  }
const client = generateClient<Schema>();
export default function SedeController({nit, onchanging}:SedeControllerProps) {
    
    const [sedes,setSedes] = useState<Array<Schema["Sedes"]["type"]>>([]);
   
    const prevSedesRef = React.useRef<Array<Schema["Sedes"]["type"]>>([]);
    function listSedes() {
          client.models.Sedes.observeQuery({
            filter: {
              empresaId: {
                eq: nit
              }
            }
          }).subscribe({
            next: (data) => {
              // Solo actualiza si los datos son diferentes
              const newSedes = [...data.items];
              if (JSON.stringify(prevSedesRef.current) !== JSON.stringify(newSedes)) {
                console.log("Se actualizaron las sedes");
                prevSedesRef.current = newSedes;
                setSedes(newSedes);
              }
            },
          });
        
        }
    
      
       
        useEffect(() => {
          listSedes();
        }, []);
    
  return (
    <div className="p-4">
    {sedes.length > 0 ? (
      <select 
        onChange={(e) => onchanging(e.target.value)}
        className="w-full p-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="" disabled>Selecciona una sede</option>
        {sedes.map((sede) => (
          <option 
            key={sede.idsedes} 
            value={sede.idsedes}
          >
            {sede.nombre} - {sede.direccion}
          </option>
        ))}
      </select>
    ) : (
      <div className="text-gray-500">loading</div>
    )}
  </div>
  )
}
