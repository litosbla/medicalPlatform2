
'use client'

import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import React, { useEffect, useState } from 'react'
import { Building } from 'lucide-react';

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
    <div className="p-4 flex">
   
    

    {sedes.length > 0 ? (
        <div className="relative flex justify-center align-center h-full">
           <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-gray-600" />
            
        </div>
            <select 
                onChange={(e) => onchanging(e.target.value)}
                className="w-full bg-white font-medium p-3 
                         text-gray-700 appearance-none 
                         focus:outline-none 
                         "
                defaultValue=""
            >
                <option value="" disabled>Sedes</option>
                {sedes.map((sede) => (
                    <option 
                        key={sede.idsedes} 
                        value={sede.idsedes}
                        className="py-2"
                    >
                        {sede.nombre} - {sede.direccion}
                    </option>
                ))}
            </select>
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 border border-green-200">
                    <span className="text-sm font-semibold text-green-600">
                        {sedes.length}
                    </span>
                </div>
            </div>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
            <div className="animate-pulse flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <span className="text-gray-400">Cargando sedes...</span>
            </div>
        </div>
    )}
    
</div>
  )
}
