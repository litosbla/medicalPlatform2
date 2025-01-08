import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import React, { useEffect, useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

Amplify.configure(outputs);

interface CitaControllerProps {
    sedeAtual: string;
    onchanging: (citaId: string) => void;
}

const client = generateClient<Schema>();

export default function CitaController({ sedeAtual, onchanging }: CitaControllerProps) {
    const [citas, setCitas] = useState<Array<Schema["Citas"]["type"]>>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCita, setSelectedCita] = useState<string>('');
    
    function listCitas() {
        client.models.Citas.observeQuery({
            filter: {
                sedeId: {
                    eq: sedeAtual
                }
            }
        }).subscribe({
            next: (data) => {
                // Ordenar las citas por fecha, más reciente primero
                const sortedCitas = [...data.items].sort((a, b) => {
                    if (!a.fecha || !b.fecha) return 0;
                    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                });
                setCitas(sortedCitas);
            },
        });
    }

    useEffect(() => { 
        listCitas();
        setSelectedCita(''); // Reset selection when sede changes
    }, [sedeAtual]);

    const handleCitaSelect = (otp: string | null | undefined, estado: string | null | undefined, fecha: string | null | undefined) => {
        if (!otp || !estado || !fecha) return;
        setSelectedCita(`${fecha} - ${otp}`);
        onchanging(otp);
        setIsOpen(false);
    };

    const StatusIndicator = ({ estado }: { estado: string | null | undefined }) => {
        const isActive = estado?.toLowerCase() === 'activa';
        return (
            <div 
                className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}
            />
        );
    };

    return (
        <div className="relative max-w-[250px]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-3 bg-white border rounded-lg shadow-sm 
                         hover:border-green-400 transition-all flex items-center justify-between
                         focus:outline-none focus:ring-2 focus:ring-green-500/50
                         h-[50px]"
            >
                <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 whitespace-nowrap overflow-hidden">
                        {selectedCita || 'Seleccionar Cita'}
                    </span>
                    {citas.length > 0 && (
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                            <span className="text-sm font-semibold text-green-600">
                                {citas.length}
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
                        {citas.length > 0 ? (
                            citas.map((cita) => {
                                if (!cita.otp || !cita.estado || !cita.fecha) return null;
                                
                                return (
                                    <button
                                        key={cita.otp}
                                        onClick={() => handleCitaSelect(cita.otp, cita.estado, cita.fecha)}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 
                                                 transition-colors flex items-center gap-3
                                                 text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                                    >
                                        <StatusIndicator estado={cita.estado} />
                                        <span className="text-gray-600">{cita.fecha}</span>
                                        <span className="text-gray-400 text-sm">- {cita.otp}</span>
                                    </button>
                                );
                            })
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                Cargando citas...
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}