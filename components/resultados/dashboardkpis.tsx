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
import { RefreshCw, Loader , Download, Section,  UserX , BarChart } from 'lucide-react';
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
import { Card, CardContent } from "../ui/card";
Amplify.configure(outputs);
interface DominioLiderazgo {
  titulo: string;
  valor: number;
  color: string;
}
const client = generateClient<Schema>();
export default function DasboardPrincipalA({citaActual,empresanit}:{citaActual:string,empresanit:string}) {
    const [estresOpen, setEstresOpen] = useState<boolean>(false)
    const [empleados, setEmpleados] = useState<Array<Schema["Empleado"]["type"]>>([]);
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
          const [empleados, personalesData, intraAData, intraBData, extraData, estresData] = await Promise.all([
            client.models.Empleado.list({
              filter: { empresaId: { eq: empresanit } }
            }),
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
          setEmpleados(empleados.data);
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
    const empleadosConEstres = currentEstres.filter(
      estres => estres.nivelRiesgoTotal === 'alto' || estres.nivelRiesgoTotal === 'muyAlto'
    );

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
    const handleEstres = () => {
      
      setEstresOpen(!estresOpen)
      console.log(estresOpen)
    }
    
  return (
    <div className="w-full flex flex-col gap-4 p-4 mt-6" >
        <div className="flex justify-center gap-5">
            <button 
                onClick={fetchInitialData}
                disabled={isLoading}
                className=" flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors  bg-green-500 text-white hover:text-green-500"
            >
               {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
                ) : (
                <RefreshCw className="w-5 h-5 transition-colors" />
                )}
            </button>
            <button 
              onClick={handleDownloadWord}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors bg-green-500 text-white  hover:text-green-500"
          >
              <Download className="w-5 h-5  transition-colors" />
          </button>
            <h1 className="text-3xl font-bold text-gray-800">DASHBOARD DE LA CITA {citaActual}</h1>
          <button 
                onClick={handleEstres}
                disabled={isLoading}
                className={` flex items-center justify-center w-10 h-10 rounded-full ${estresOpen ? 'hover:bg-gray-100 transition-colors  bg-green-400 text-white hover:text-green-500':'hover:bg-gray-100 transition-colors  bg-red-400 text-white hover:text-red-500'} `}
            >
              {estresOpen ? (
                <BarChart className="w-5 h-5  transition-colors" />
                
                ) : (
                  <UserX className="w-5 h-5   transition-colors" />
                )}
                
               
            </button>
        </div>
        
        

        {isLoading ? (
        <div>loading</div>    
        )
        : ( !estresOpen ? (
            <div className="flex flex-wrap w-full gap-4 justify-center mt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h1 className="text-2xl font-bold text-gray-800">FORMULARIO DATOS PERSONALES</h1>
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
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h1 className="text-2xl font-bold text-gray-800">FORMULARIO INTRALABORAL A</h1>
                  </div>
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
                  
                  {currentIntraB.length > 0 && (
                  <section id="datosIntralaborlB">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h1 className="text-2xl font-bold text-gray-800">FORMULARIO INTRALABORAL B</h1> 
                  </div>
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
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h1 className="text-2xl font-bold text-gray-800">FORMULARIO EXTRALABORAL</h1>
                  </div>
                  <div className="w-full flex flex-wrap gap-4" id="datosExtralaboral">
                    <GraficoPie 
                          chartData={resultadosExtralaboral.general.riesgos} 
                          title='Factores de Riesgo Extralaboral' 
                          dataDimensiones={dataDimensionesExtralaboral}
                      />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h1 className="text-2xl font-bold text-gray-800">FORMULARIO ESTRÉS</h1>
                  </div>
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

            </div>) :
            (<div className="flex flex-wrap w-full gap-4 justify-center mt-5">
              {empleadosConEstres.map((empleadoEstresado) => {
                const nombreEmpleado = empleados.find(empleado => empleado.numeroDocumento === empleadoEstresado.documento)?.nombre?.toLocaleUpperCase() ;
                const dataDimensionesEmpleadosConEstres: DimensionData[] = [
                  {
                      titulo: 'Comunicación y Relaciones',
                      valor: empleadoEstresado.comunicacionRelaciones?.puntajeTransformado?? 0,
                      color: "text-blue-600"
                  },
                  {
                      titulo: 'Relaciones Familiares',
                      valor: empleadoEstresado.relacionesFamiliares?.puntajeTransformado?? 0,
                      color: "text-blue-600"
                  },
                  {
                      titulo: 'Situación Económica',
                      valor: empleadoEstresado.situacionEconomica?.puntajeTransformado?? 0,
                      color: "text-blue-600"
                  },
                  {
                      titulo: 'Tiempo Fuera del Trabajo',
                      valor: empleadoEstresado.tiempoFueraTrabajo?.puntajeTransformado?? 0,
                      color: "text-blue-600"
                  }
                ];


                return (
                  <div className='w-[60%] p-4 flex flex-col justify-center ml-4 gap-5 relative'>
                    <h3 className="text-lg font-bold mb-2 text-center">{nombreEmpleado} {empleadoEstresado.documento} <span className={`${empleadoEstresado.nivelRiesgoTotal === 'muyAlto'? 'bg-red-500' : 'bg-red-300' } w-[100px] text-center text-white font-bold rounded-xl p-1 absolute top-3 right-0`}>{empleadoEstresado.nivelRiesgoTotal}</span></h3>
                    <div className='mt-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
                    <div className="space-y-1">
                      {dataDimensionesEmpleadosConEstres.map((dominio: DominioLiderazgo, index: number) => (
                          <Card key={index} className="bg-white shadow hover:shadow-md transition-shadow duration-300">
                          <CardContent className="p-3">
                              <div className="flex items-center justify-between gap-2">
                              <h3 className="text-sm font-medium text-gray-800 flex-1">
                                  {dominio.titulo}
                              </h3>
                              <div className="flex items-center gap-2">
                                  <div className={`text-base font-bold ${dominio.color} min-w-[2.5rem] text-right`}>
                                  {Math.round(dominio.valor * 100) / 100}
                                  </div>
                                  <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                                  <div 
                                      className="h-full bg-blue-600 rounded-full"
                                      style={{
                                      width: `${(dominio.valor / 100) * 100}%`
                                      }}
                                  />
                                  </div>
                              </div>
                              </div>
                          </CardContent>
                          </Card>
                      ))}
                      </div>
                  </div>
              </div>
                )
              })}
            </div>
          )

            

        )
        }
    </div>
  )
}

