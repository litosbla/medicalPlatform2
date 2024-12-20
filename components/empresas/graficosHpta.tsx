import React, { useEffect, useState } from 'react'
import GraficoPie from '@/components/graficopie';
import { GraficoLineas } from '@/components/graficolineas';
import { GraficoBarras } from '@/components/graficobarras';
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { generateClient } from "aws-amplify/data";

Amplify.configure(outputs);
const client = generateClient<Schema>();
const chartData1 = [
    { riesgo: "alto", personas: 387, fill: "var(--color-alto)" },
    { riesgo: "medio", personas: 245, fill: "var(--color-medio)" },
    { riesgo: "bajo", personas: 198, fill: "var(--color-bajo)" },
    { riesgo: "sinRiesgo", personas: 170, fill: "var(--color-sinRiesgo)" },
  ];
  
  const chartData2 = [
    { riesgo: "alto", personas: 156, fill: "var(--color-alto)" },
    { riesgo: "medio", personas: 423, fill: "var(--color-medio)" },
    { riesgo: "bajo", personas: 267, fill: "var(--color-bajo)" },
    { riesgo: "sinRiesgo", personas: 154, fill: "var(--color-sinRiesgo)" },
  ];
  
  const chartData3 = [
    { riesgo: "alto", personas: 187, fill: "var(--color-alto)" },
    { riesgo: "medio", personas: 234, fill: "var(--color-medio)" },
    { riesgo: "bajo", personas: 456, fill: "var(--color-bajo)" },
    { riesgo: "sinRiesgo", personas: 123, fill: "var(--color-sinRiesgo)" },
  ];
  
  const chartData4 = [
    { riesgo: "alto", personas: 145, fill: "var(--color-alto)" },
    { riesgo: "medio", personas: 189, fill: "var(--color-medio)" },
    { riesgo: "bajo", personas: 234, fill: "var(--color-bajo)" },
    { riesgo: "sinRiesgo", personas: 398, fill: "var(--color-sinRiesgo)" },
  ];
  const chartData5 = [
    { month: "Junio", alto: 186, bajo: 80, medio: 45, sinRiesgo: 20 },
    { month: "Julio", alto: 305, bajo: 200, medio: 100, sinRiesgo: 50 },
    { month: "Agosto", alto: 237, bajo: 120, medio: 150, sinRiesgo: 30 },
    { month: "Septiembre", alto: 73, bajo: 190, medio: 50, sinRiesgo: 45 },
    { month: "Octubre", alto: 209, bajo: 130, medio: 100, sinRiesgo: 60 },
    { month: "Noviembre", alto: 214, bajo: 140, medio: 160, sinRiesgo: 25 }
  ];
  const chartData6 = [
    { riesgo: "alto", personas: 50, fill: "var(--color-alto)" },
    { riesgo: "medio", personas: 60, fill: "var(--color-medio)" },
    { riesgo: "bajo", personas: 80, fill: "var(--color-bajo)" },
    { riesgo: "sinRiesgo", personas: 75, fill: "var(--color-sinRiesgo)" }
  ]
  
export default function GraficosHpta() {
        const [currentIntraA,setCurrentIntraA] = useState<Array<Schema["FormularioIntralaboralA"]["type"]>>([]);
        const [currentIntrB,setCurrentIntraB] = useState<Array<Schema["FormularioIntralaboralB"]["type"]>>([]);
        const [currentExtralaboral,setCurrentExtralaboral] = useState<Array<Schema["FormularioExtralaboral"]["type"]>>([]);
        const [currentEstres,setCurrentEstres] = useState<Array<Schema["FormularioEstres"]["type"]>>([]);
        
        function listCurrentIntraA() {
            client.models.FormularioIntralaboralA.observeQuery({
            }).subscribe({
              next: (data) => setCurrentIntraA([...data.items]),
            });
        }
        function listCurrentIntraB() {
            client.models.FormularioIntralaboralB.observeQuery({
            }).subscribe({
              next: (data) => setCurrentIntraB([...data.items]),
            });
        }
        function listCurrentExtra() {
            client.models.FormularioExtralaboral.observeQuery({
            }).subscribe({
              next: (data) => setCurrentExtralaboral([...data.items]),
            });
        }
        function listCurrentEstres() {
          client.models.FormularioEstres.observeQuery({
          }).subscribe({
            next: (data) => setCurrentEstres([...data.items]),
          });
        }

        useEffect(() => {
              listCurrentIntraA();
              listCurrentIntraB();
              listCurrentExtra();
              listCurrentEstres();
            }, []);
  return (
    <div>
        <div className='flex w-full gap-4'>
            <GraficoBarras chartData={chartData6} title='Riesgo Actual' className='w-[50%]'/>
        </div>
        <div className='flex flex-wrap w-full gap-4'>         
            <GraficoLineas chartData={chartData5} title='Historico de Riesgo' className='flex-1' />
            <GraficoPie chartData={chartData1} title='Liderazgo y Relaciones Sociales en el Trabajo'/>
            <GraficoPie chartData={chartData2} title='Control Sobre el trabajo'/>
            <GraficoPie chartData={chartData3} title='Demandas del Trabajo'/>
            <GraficoPie chartData={chartData4} title='Recompensas'/>
        </div> 
    </div>
  )
}
