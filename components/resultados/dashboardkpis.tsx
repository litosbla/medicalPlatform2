"use client"
import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import React, { useEffect, useState, useRef } from 'react'
import GraficoPie from '@/components/graficopie';
import { Document, Packer, Paragraph, ImageRun } from 'docx';
import html2canvas from 'html2canvas';
import DadgraficoIntraa from "@/components/resultados/dadgraficoIntraa";
import { RefreshCw, Loader , Download, Section} from 'lucide-react';
import DashboardRiesgos from "@/components/resultados/dadgraficosprueb";
import {
  genderCategories,
  maritalStatusCategories,
  educationCategories,
  stratumCategories,
  housingCategories,
  positionTypeCategories,
  contractTypeCategories,
  salaryTypeCategories,
  transformFormData
} from '@/types/graficos/typesPersonales';
import { 
  DimensionData,
  DOMAIN_CONFIG,
  processFormularios,
  formatDimensionTitle } from '@/types/graficos/masterFileIntralaboral';
import { processFormulariosExtralaboral} from '@/types/graficos/masterFileExtralaboral';
import { processFormulariosEstres } from '@/types/graficos/masterFileEstres';
import FlexiblePieChart from '@/components/flexiblegraficopie';
Amplify.configure(outputs);

const client = generateClient<Schema>();
export default function DasboardPrincipalA({citaActual}:{citaActual:string}) {
    const [currentPersonales, setPersonales] = useState<Array<Schema["FormularioPersonales"]["type"]>>([]);
    const [currentIntraA,setCurrentIntraA] = useState<Array<Schema["FormularioIntralaboralA"]["type"]>>([]);
    const [currentIntraB,setCurrentIntraB] = useState<Array<Schema["FormularioIntralaboralB"]["type"]>>([]);
    const [currentExtralaboral,setCurrentExtralaboral] = useState<Array<Schema["FormularioExtralaboral"]["type"]>>([]);
    const [currentEstres,setCurrentEstres] = useState<Array<Schema["FormularioEstres"]["type"]>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
          // Fetch all data concurrently
          const [personalesData, intraAData, intraBData, extraData, estresData] = await Promise.all([
            client.models.FormularioPersonales.list({
              filter: { citaId: { eq: citaActual } }
            }),
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
          setPersonales(personalesData.data);
          setCurrentIntraA(intraAData.data);
          setCurrentIntraB(intraBData.data);
          setCurrentExtralaboral(extraData.data);
          setCurrentEstres(estresData.data);
          // console.log('########################################');
          // console.log(personalesData.data);
          // console.log(intraAData.data);
          // console.log(intraBData.data);
          // console.log(extraData.data);
          // console.log(estresData.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };

    useEffect(() => {
        fetchInitialData();
      }, [citaActual]);
    
    // transformar Datos Personales
    const genderData = transformFormData(currentPersonales, 'sexo');
    const maritalStatusData = transformFormData(currentPersonales, 'estadoCivil');
    const educationData = transformFormData(currentPersonales, 'nivelEstudios');
    const stratumData = transformFormData(currentPersonales, 'estrato');
    const housingData = transformFormData(currentPersonales, 'tipoVivienda');
    const positionTypeData = transformFormData(currentPersonales, 'tipoCargo');
    const contractTypeData = transformFormData(currentPersonales, 'tipoContrato');
    const salaryTypeData = transformFormData(currentPersonales, 'tipoSalario');
    
    // transofrmar Datos Intralaboral A
    const resultadosIntraA = processFormularios(currentIntraA);
    // transformar Datos Intralaboral B
    const resultadosIntraB = processFormularios(currentIntraB);

    // transformar Datos Extralaboral
    const resultadosExtralaboral = processFormulariosExtralaboral(currentExtralaboral);
    
    const dataDimensionesExtralaboral: DimensionData[] = [
        {
            titulo: 'Características de Vivienda',
            valor: resultadosExtralaboral.dimensiones.caracteristicasVivienda.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Comunicación y Relaciones',
            valor: resultadosExtralaboral.dimensiones.comunicacionRelaciones.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Desplazamiento Vivienda',
            valor: resultadosExtralaboral.dimensiones.desplazamientoVivienda.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Influencia Entorno',
            valor: resultadosExtralaboral.dimensiones.influenciaEntorno.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Relaciones Familiares',
            valor: resultadosExtralaboral.dimensiones.relacionesFamiliares.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Situación Económica',
            valor: resultadosExtralaboral.dimensiones.situacionEconomica.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Tiempo Fuera del Trabajo',
            valor: resultadosExtralaboral.dimensiones.tiempoFueraTrabajo.promedio,
            color: "text-blue-600"
        }
    ];

    // transformar Datos Estres

    const resultadosEstres = processFormulariosEstres(currentEstres);
    
    const dataDimensionesEstres: DimensionData[] = [
        {
            titulo: 'Comunicación y Relaciones',
            valor: resultadosEstres.dimensiones.comunicacionRelaciones.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Relaciones Familiares',
            valor: resultadosEstres.dimensiones.relacionesFamiliares.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Situación Económica',
            valor: resultadosEstres.dimensiones.situacionEconomica.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Tiempo Fuera del Trabajo',
            valor: resultadosEstres.dimensiones.tiempoFueraTrabajo.promedio,
            color: "text-blue-600"
        }
    ];



    const getDimensionDataA = (dimensions: string[]): DimensionData[] => {
      return dimensions.map(dimension => ({
        titulo: formatDimensionTitle(dimension),
        valor: resultadosIntraA.dimensiones[dimension]?.promedio || 0,
        color: "text-blue-600"
      }));
    };
    const getDimensionDataB = (dimensions: string[]): DimensionData[] => {
      return dimensions.map(dimension => ({
        titulo: formatDimensionTitle(dimension),
        valor: resultadosIntraB.dimensiones[dimension]?.promedio || 0,
        color: "text-blue-600"
      }));
    };
    const handleDownloadWord = async () => {
      try {
        // Capturar cada sección de gráficos
        const sections = [
          'datosPersonales',
          'datosIntralaborlA',
          'datosIntralaborlB',
          'datosExtralaboral'
        ];
  
        const imageParagraphs = [];
  
        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section) {
            const charts = section.querySelectorAll('.chart-container');
            const chartsArray = Array.from(charts); // Añade esta clase a tus contenedores de gráficos
            for (const chart of chartsArray) {
              const canvas = await html2canvas(chart as HTMLElement,{
                scale: 2, // Increases resolution
                useCORS: true,
                backgroundColor: null,
                logging: false,
                //  allowTaint: true
                onclone: (doc) => {
                  const elements = doc.getElementsByClassName('chart-container');
                  for (const el of Array.from(elements)) {
                    (el as HTMLElement).style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                  }
                }
              });
              const blob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((blob) => resolve(blob!), 'image/png');
              });
  
              const arrayBuffer = await blob.arrayBuffer();
              
              imageParagraphs.push(
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: arrayBuffer,
                      transformation: {
                        width:  canvas.width,
                        height: canvas.height
                      },
                      type: "png"
                    } as any)
                  ]
                })
              );
            }
          }
        }
  
        const doc = new Document({
          sections: [{
            properties: {},
            children: [
              new Paragraph({
                text: "Dashboard Principal A Report",
              }),
              ...imageParagraphs
            ],
          }],
        });
  
        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'dashboard-report.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error generating Word document:', error);
      }
    };
    
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
            <button 
              onClick={handleDownloadWord}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          >
              <Download className="w-5 h-5 text-green-600 hover:text-blue-500 transition-colors" />
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
                  <h1 className="text-2xl font-bold text-gray-800">Datos Personales</h1>
                </div>
                  <div className="w-full flex flex-wrap gap-4" id="datosPersonales">
                    <FlexiblePieChart
                      title="Distribución por Sexo"
                      categories={genderCategories}
                      data={genderData}
                    />
                    <FlexiblePieChart
                      title="Distribución por Estado Civil"
                      categories={maritalStatusCategories}
                      data={maritalStatusData}
                    />
                    <FlexiblePieChart
                      title="Distribución por Nivel de Estudios"
                      categories={educationCategories}
                      data={educationData}
                    />
                    <FlexiblePieChart
                      title="Distribución por Estrato"
                      categories={stratumCategories}
                      data={stratumData}
                    />
                    <FlexiblePieChart
                      title="Distribución por Tipo de Vivienda"
                      categories={housingCategories}
                      data={housingData}
                    />
                    <FlexiblePieChart
                      title="Distribución por Tipo de Cargo"
                      categories={positionTypeCategories}
                      data={positionTypeData}
                    />
                    <FlexiblePieChart
                      title="Distribución por Tipo de Contrato"
                      categories={contractTypeCategories}
                      data={contractTypeData}
                    />
                    <FlexiblePieChart
                      title="Distribución por Tipo de Salario"
                      categories={salaryTypeCategories}
                      data={salaryTypeData}
                    />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">Datos Intralaboral A</h1>
                  <div className="w-full flex flex-wrap gap-4" id="datosIntralaborlA">
                    {Object.values(DOMAIN_CONFIG).map(domain => (
                      <GraficoPie
                        key={domain.key}
                        chartData={resultadosIntraA.dominios[domain.label]}
                        title={domain.label}
                        dataDimensiones={getDimensionDataA(domain.dimensions)}
                      />
                    ))}
                  </div>
                  
                  {currentIntraB.length > 0 && (<section id="datosIntralaborlB">
                  <h1 className="text-2xl font-bold text-gray-800">Datos Intralaboral B</h1> 
                  <div className="w-full flex flex-wrap gap-4" >
                    {Object.values(DOMAIN_CONFIG).map(domain => (
                      <GraficoPie
                        key={domain.key}
                        chartData={resultadosIntraB.dominios[domain.label]}
                        title={domain.label}
                        dataDimensiones={getDimensionDataB(domain.dimensions)}
                      />
                    ))}
                  </div>
                  </section>)}
                  <h1 className="text-2xl font-bold text-gray-800">Datos Extralaboral</h1>
                  <div className="w-full flex flex-wrap gap-4" id="datosExtralaboral">
                    <GraficoPie 
                          chartData={resultadosExtralaboral.general.riesgos} 
                          title='Factores de Riesgo Extralaboral' 
                          dataDimensiones={dataDimensionesExtralaboral}
                      />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">Datos Estres</h1>
                  <div className="w-full flex flex-wrap gap-4" id="datosEstres">
                    <GraficoPie 
                          chartData={resultadosEstres.general.riesgos} 
                          title='Factores de Estrés' 
                          dataDimensiones={dataDimensionesEstres}
                      />
                  </div>
                {/* <DadgraficoIntraa datos={currentIntraA}/> */}

                {/* <DashboardRiesgos datos={currentIntraA}/> */}
               
                {/* <DadgraficoIntrab datos={currentIntrB}/> */}

            </div>

            

        )
        }
    </div>
  )
}

