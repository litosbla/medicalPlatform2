"use client"
import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import React, { useEffect, useState } from 'react'
import GraficoPie from '@/components/graficopie';
import DadgraficoIntraa from "@/components/resultados/dadgraficoIntraa";
import { RefreshCw, Loader } from 'lucide-react';
import DadgraficoIntrab from "@/components/resultados/dadgraficosIntrab";
import DashboardRiesgos from "@/components/resultados/dadgraficosprueb";
const chartData1 = [
  { riesgo: "alto", personas: 387, fill: "var(--color-alto)" },
  { riesgo: "medio", personas: 245, fill: "var(--color-medio)" },
  { riesgo: "bajo", personas: 198, fill: "var(--color-bajo)" },
  { riesgo: "sinRiesgo", personas: 170, fill: "var(--color-sinRiesgo)" },
  { riesgo: "muyAlto", personas: 170, fill: "var(--color-muyAlto)" },

];
Amplify.configure(outputs);

const client = generateClient<Schema>();
export default function DasboardPrincipalA({citaActual}:{citaActual:string}) {
    const [currentIntraA,setCurrentIntraA] = useState<Array<Schema["FormularioIntralaboralA"]["type"]>>([]);
    const [currentIntrB,setCurrentIntraB] = useState<Array<Schema["FormularioIntralaboralB"]["type"]>>([]);
    const [currentExtralaboral,setCurrentExtralaboral] = useState<Array<Schema["FormularioExtralaboral"]["type"]>>([]);
    const [currentEstres,setCurrentEstres] = useState<Array<Schema["FormularioEstres"]["type"]>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
          // Fetch all data concurrently
          const [intraAData, intraBData, extraData, estresData] = await Promise.all([
            client.models.FormularioIntralaboralA.list({
              filter: { citaIdIntraA: { eq: citaActual } }
            }),
            client.models.FormularioIntralaboralB.list({
              filter: { citaIdIntraB: { eq: citaActual } }
            }),
            client.models.FormularioExtralaboral.list({
              filter: { citaIdExtra: { eq: citaActual } }
            }),
            client.models.FormularioEstres.list({
              filter: { citaIdEstres: { eq: citaActual } }
            })
          ]);
          setCurrentIntraA(intraAData.data);
          setCurrentIntraB(intraBData.data);
          setCurrentExtralaboral(extraData.data);
          setCurrentEstres(estresData.data);
          console.log(intraAData.data);
          console.log(intraBData.data);
          console.log(extraData.data);
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
                className=" flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
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
        <div>loading</div>    
        )
        : (
            <div className="flex flex-wrap w-full gap-4 justify-center mt-5">
                <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <h1 className="text-2xl font-bold text-gray-800">Intralaboral A</h1>
                </div>
                {/* <DadgraficoIntraa datos={currentIntraA}/> */}

                <DashboardRiesgos datos={currentIntraA}/>
               
                {/* <DadgraficoIntrab datos={currentIntrB}/> */}

            </div>

            

        )
        }
    </div>
  )
}

