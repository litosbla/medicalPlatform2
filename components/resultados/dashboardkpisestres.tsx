"use client"
import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import React, { useEffect, useState } from 'react';
import { RefreshCw, Loader } from 'lucide-react';
import DadgraficoEstres from "@/components/resultados/dadgraficoestres";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function DashboardPrincipalEstres({citaActual}: {citaActual: string}) {
    const [currentEstres, setCurrentEstres] = useState<Array<Schema["FormularioEstres"]["type"]>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            const estresData = await client.models.FormularioEstres.list({
                filter: { citaIdEstres: { eq: citaActual } }
            });
            setCurrentEstres(estresData.data);
            console.log('#############Intralaboral B data:');
            console.log(estresData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, [citaActual]);

    return (
        <div className="w-full flex flex-col gap-4 p-4">
            <div className="flex justify-center gap-5">
                <button 
                    onClick={fetchInitialData}
                    disabled={isLoading}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                >
                    {isLoading ? (
                        <Loader className="w-5 h-5 animate-spin text-blue-500" />
                    ) : (
                        <RefreshCw className="w-5 h-5 text-green-600 hover:text-blue-500 transition-colors" />
                    )}
                </button>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard de la cita {citaActual}</h1>
            </div>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex flex-wrap w-full gap-4 justify-center mt-5">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <h1 className="text-2xl font-bold text-gray-800">Estres</h1>
                    </div>
                    <DadgraficoEstres datos={currentEstres}/> 
                </div>
            )}
        </div>
    );
}