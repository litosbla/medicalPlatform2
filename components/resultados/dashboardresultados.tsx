'use client'

import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import React, { useEffect, useState } from 'react'
import { Building, ChevronDown } from 'lucide-react';

Amplify.configure(outputs);

interface SedeControllerProps {
    nit: string;
    onchanging: (sedeId: string) => void;  // Added explicit type
}

const client = generateClient<Schema>();

export default function SedeController({nit, onchanging}: SedeControllerProps) {
    const [sedes, setSedes] = useState<Array<Schema["Sedes"]["type"]>>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSede, setSelectedSede] = useState<string>('');
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
                const newSedes = [...data.items];
                if (JSON.stringify(prevSedesRef.current) !== JSON.stringify(newSedes)) {
                    prevSedesRef.current = newSedes;
                    setSedes(newSedes);
                }
            },
        });
    }
    
    useEffect(() => {
        listSedes();
    }, []);

    const handleSedeSelect = (sedeId: string | null | undefined, sedeName: string | null | undefined) => {
        if (!sedeId || !sedeName) return; // Early return if either value is null/undefined
        setSelectedSede(sedeName);
        onchanging(sedeId);
        setIsOpen(false);
    };

    return (
        <div className="relative max-w-[250px]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-3 bg-white border rounded-lg shadow-sm 
                         hover:border-green-400 transition-all flex items-center justify-between
                         focus:outline-none focus:ring-2 focus:ring-green-500/50"
            >
                <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">
                        {selectedSede || 'Seleccionar Sede'}
                    </span>
                    {sedes.length > 0 && (
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                            <span className="text-sm font-semibold text-green-600">
                                {sedes.length}
                            </span>
                        </div>
                    )}
                </div>
                <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 
                              ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
                    <div className="max-h-64 overflow-y-auto">
                        {sedes.length > 0 ? (
                            sedes.map((sede) => (
                                <button
                                    key={sede.idsedes}
                                    onClick={() => handleSedeSelect(sede.idsedes, sede.nombre)}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 
                                             transition-colors flex items-center gap-3
                                             text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                                >
                                    <span>{sede.nombre}</span>
                                    <span className="text-gray-400 text-sm">- {sede.direccion}</span>
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                Cargando sedes...
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}