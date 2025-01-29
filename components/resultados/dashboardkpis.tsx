"use client"
import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import React, { useEffect, useState, useRef } from 'react'
import GraficoPie from '@/components/graficopie';
import { 
  Document, 
  Paragraph, 
  Header, 
  TextRun, 
  ImageRun, 
  AlignmentType, 
  HeadingLevel, 
  Packer, 
  SectionType,
  HorizontalPositionRelativeFrom,
  VerticalPositionRelativeFrom,
  HorizontalPositionAlign,
  VerticalPositionAlign,
  TextWrappingType 
} from 'docx';
import headerIMG from '@/public/assets/materialdescarga/header.png';
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
  formatDimensionTitle,
  DIMENSIONESTRANSFORMADAS
} from '@/types/graficos/masterFileIntralaboral';
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
    const [isDownloading, setIsDownloading] = useState(false);
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
      setIsDownloading(true);
      try {

        const elementoACapturar = document.getElementById('imagenheader') as HTMLElement;
        elementoACapturar.style.display = 'block';

      // Realizar la captura
        const canvas = await html2canvas(elementoACapturar,{
          scale: 1, // Increases resolution
          useCORS: true,
          backgroundColor: null,
          logging: false,
          //  allowTaint: true
          
        });
        elementoACapturar.style.display = 'none';
        
        const blobheader = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/png');
        });

        const arrayBuffer = await blobheader.arrayBuffer();

        const header = new Header({
          children: [
            new Paragraph({
              children: [
                new ImageRun({
                  data: arrayBuffer,
                  transformation: {
                    width:  canvas.width ,
                    height: canvas.height
                  },
                  type: "png"
                } as any),
                
              ],
              alignment: AlignmentType.LEFT,
            }),
          ],
        });
        
        const firmaACapturar = document.getElementById('imagenfirma') as HTMLElement;
        firmaACapturar.style.display = 'block';

      // Realizar la captura
        const canvasfirma = await html2canvas(firmaACapturar,{
          scale: 1, // Increases resolution
          useCORS: true,
          backgroundColor: null,
          logging: false,
          //  allowTaint: true
          
        });
        firmaACapturar.style.display = 'none';
        
        const blobfirma = await new Promise<Blob>((resolve) => {
          canvasfirma.toBlob((blob) => resolve(blob!), 'image/png');
        });

        const arrayBufferFirma = await blobfirma.arrayBuffer();
         
        
        // const watermarkImageData = await fetch('/public/assets/materialdescarga/waetermark.png').then(res => res.arrayBuffer());
        // const createWatermarkParagraph = () => new Paragraph({
        //   children: [
        //     new ImageRun({
        //       data: watermarkImageData ,
        //       transformation: {
        //         width: 600,
        //         height: 600,
        //         rotation: 45,
        //       },
        //       type: "png",
        //       floating: {
        //         horizontalPosition: {
        //           relative: HorizontalPositionRelativeFrom.PAGE,
        //           align: HorizontalPositionAlign.CENTER,
        //         },
        //         verticalPosition: {
        //           relative: VerticalPositionRelativeFrom.PAGE,
        //           align: VerticalPositionAlign.CENTER,
        //         },
        //         zIndex: -1,
        //       },
        //     }),
        //   ],
        // });
        const headerclass = 'nombreempresa';      
        const nombreEmpresa = document.getElementById(headerclass);
        const fechaActual = new Date().toISOString().split('T')[0];
        
        const presentationPage = [
          // createWatermarkParagraph(),
          new Paragraph({
            text: "INFORME DE RESULTADOS GENERALES BATERÍA PARA LA EVALUACIÓN DE FACTORES DE RIESGO PSICOSOCIAL",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 700,
            },
          }),
          new Paragraph({
            text: nombreEmpresa?.textContent?? 'EMPRESA',
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 700,
            },
          }),
          new Paragraph({
            text: "BOGOTA",
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: fechaActual,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 700,
            },
          }),
          new Paragraph({
            text: "Yury Paola Ochoa Diaz",
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 700,
            },
          }),
          new Paragraph({
            text: "Psicóloga, Especialista en Gerencia en Salud y Seguridad en el Trabajo",
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 700,
            },
          }),
          new Paragraph({
            text: "Licencia SST 3861/2020",
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 700,
            },
          }),
          new Paragraph({
            text: "Medical Friends",
            alignment: AlignmentType.CENTER,
          }),
        ];

        const introductionPage = [
          // createWatermarkParagraph(),
          new Paragraph({
            text: "INTRODUCCIÓN",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400,
            },
          
          }),
          new Paragraph({
            
              children: [
                new TextRun({
                  text: `Con el fin de preservar la salud mental de los trabajadores, con la identificación, evaluación, prevención, intervención y monitoreo permanente de la exposición a factores de riesgo psicosocial en el trabajo y para la determinación del origen de las patologías causadas por el estrés ocupacional, se aplicó la batería de Riesgo Psicosocial, con el fin de cumplir satisfactoriamente en el marco normativo establecido en Colombia para tal fin, en tal razón, se hace necesario desplegar acciones que permitan mitigar y controlar este riesgo que afecta de manera significativa en la población trabajadora de la empresa, y de esta forma contribuir en la mejora continua del riesgo psicosocial en el personal que labora tanto en la parte operativa con en la parte administrativa y operativa en ${nombreEmpresa?.textContent}`,
                  size: 23,
                  
              }),],
  
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
        ];

        const objetivosPage = [
          // createWatermarkParagraph(),
          new Paragraph({
            text: "OBJETIVOS",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400,
            },
          
          }),
          new Paragraph({
            children:[
              new TextRun({
                text: 'Objetivos General',
                size: 23,
            }),],
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children:[
              new TextRun({
                text: `Identificar los factores protectores y de riesgo psicosocial de la empresa  ${nombreEmpresa?.textContent} y las directrices generales para el plan de acción a seguir a fin de mitigar el riesgo evaluado. `,
                size: 23,
            }),],
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children:[
              new TextRun({
                text: 'Objetivos Específicos',
                size: 23,
            }),],
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children:[
              new TextRun({
                text: `1. Determinar los factores psicosociales que tienen mayor impacto sobre los trabajadores que laboran en ${nombreEmpresa?.textContent}`,
                size: 23,
            }),],
            alignment: AlignmentType.JUSTIFIED,
            bullet: { level: 0 },
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children:[
              new TextRun({
                 text: '2. Plantear las estrategias de gestión del riesgo intralaboral, extra laboral, estrés identificado a partir de la Estrategia de abordaje Psicosocial que mejoren las condiciones de trabajo y garanticen la disminución del riesgo.',
                size: 23,
            }),],
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
          
        ];

        const justificacionPage = [
          // createWatermarkParagraph(),
          new Paragraph({
            text: "JUSTIFICACIÓN",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400,
            },
          
          }),
          new Paragraph({
            children:[
              new TextRun({
                text: 'En la actualidad, el riesgo psicosocial tiene mucha relevancia debido a la  normatividad existente en Colombia, lo cual se dispone en la resolución 2646 del  año 2008 y Resolución 2404 de 2019, mediante la cual se establecen disposiciones que definen responsabilidades para el empleador para identificar, prevenir, intervenir , evaluar y realizar un monitoreo constante de los factores de riesgo psicosocial que puedan estar afectando en el trabajo para identificar posibles patologías que traen como consecuencia altos niveles de estrés y factores extra e intra laborales y así mismo desplegar acciones para mitigar, todo lo anterior con la finalidad de contribuir a la calidad de vida laboral, clima organizacional, bienestar entre otros, y finalmente evitar las sanciones administrativas por el incumplimiento legal, Capitulo V. Disposiciones Finales, articulo 21, Sanciones. “incumplimiento a lo establecido en la presente resolución será sancionado, de conformidad con lo dispuesto en los literales a) y c) del artículo 91 del Decreto-ley 1295 de 1994. La investigación administrativa y la sanción serán de competencia de las Direcciones Territoriales del Ministerio de la Protección Social, de conformidad con lo previsto en el artículo 115 del Decreto-ley 2150 de 1995, articulo 13 de la Ley 1562 de 2012, en armonía con el capítulo 11 del título 4 de la parte 2 del Libro 2 del Decreto 1072 de 2015. La investigación administrativa y la sanción serán de competencia de las Direcciones territoriales del Ministerio del Trabajo en los términos del mencionado artículo 91 del Decreto 1295 de 1994, sin perjuicio del poder preferente de que trata el artículo 32 de la Ley 1562 de 2012.',
                size: 23,
            }),],
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
            
          }),
        ];
        const marcolegalPage = [
          // createWatermarkParagraph(),
          new Paragraph({
            text: "MARCO LEGAL",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400,
            },
          
          }),
          new Paragraph({
            children:[
              new TextRun({
                text: `Resolución 2646 de 2008. “Por la cual se establecen disposiciones y se definen  responsabilidades para la identificación, evaluación, prevención, intervención y  monitoreo permanente de la exposición a factores de riesgo psicosocial en el trabajo y para la determinación del origen de las patologías causadas por el estrés ocupacional”. Ley 1010 de 2006. Tiene por objeto definir, prevenir, corregir y sancionar las diversas formas de agresión, maltrato, vejámenes, trato desconsiderado y ofensivo y en general todo ultraje a la dignidad humana que se ejercen sobre quienes realizan sus actividades económicas en el contexto de una relación laboral privada o pública. Decreto 1477 de 2014. Tiene por objeto expedir la Tabla de Enfermedades Laborales, que tendrá doble entrada:
                i) agentes de riesgo, para facilitar la prevención de enfermedades en las actividades laborales, y
                ii) grupos de enfermedades, para determinar el diagnóstico médico en los trabajadores afectados.
                Resolución 2404 de 2019. “Por la cual se adopta la Batería de Instrumentos para la Evaluación de factores de Riesgo Psicosocial, la Guía Técnica General para la Promoción, Prevención e Intervención de los factores psicosociales y sus efectos en la población trabajadora y sus protocolos específicos y se dictan otras  disposiciones.`,
                size: 23,
            }),],
           alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            text: "PROCEDIMIENTO",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400,
            },
          
          }),
        
          new Paragraph({
            children: [
                new TextRun({
                    text: "Fase I. Administración de Cuestionarios.",
                    size: 23,
                    
                }),
                new TextRun({
                  text: `En esta fase se aplica la herramienta a 193 colaboradores pertenecientes a ${nombreEmpresa?.textContent} de los cuales 154 son hombres y 39 mujeres. El instrumento aplicado fue la batería para la identificación de factores de riesgo psicosocial con los cuestionarios:`,
                  size: 23,
                  
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Intralaboral (Forma A para supervisores o jefes y forma B que cumplen actividades de auxiliares u operarios)",
                    size: 23,
                    
                }),
            ],
            bullet: { level: 0 },
            
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Cuestionario de factores de riesgo psicosocial extralaboral.",
                    size: 23,
                    
                }),
            ],
            bullet: { level: 0 },
            
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Cuestionario para la evaluación del estrés.",
                    size: 23,
                    
                }),
            ],
            bullet: { level: 0 },
            
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "	De igual forma se administra la ficha de datos generales, la cual permite caracterizar la población trabajadora tanto del entorno operativo como administrativo",
                    size: 23,
                    
                }),
            ],
            bullet: { level: 0 },
            
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph({
            children: [
                new TextRun({
                    text: "Fase II. Resultados y generación de reportes.",
                    size: 23,
                    
                }),
                new TextRun({
                  text: "Se califica los cuestionarios que se han aplicado para crear la base de datos, se tabulan los resultados a través de la aplicación web www.riesgospsicosociales.com.co, creada para tal fin, de acuerdo con ello, se genera el presente informe analítico.",
                  size: 23,
                  
              }),
                new TextRun({
                  text: "Se realizó la tabulación y análisis de la información a través de la aplicación de instrumento, el cual recopila la percepción del trabajador de los factores de riesgo psicosocial, y consiste en la calificación de los siguientes criterios:",
                  size: 23,
                  
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Riesgo Muy Alto - Alto: Intervención inmediata en el marco de un SISTEMA DE VIGILANCIA EPIDEMIOLÓGICA.",
                    size: 23,
                    
                }),
            ],
            bullet: { level: 0 },
            
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Riesgo medio: Nivel de riesgo en el que se esperaría una respuesta de estrés moderada. Las dimensiones que se encuentren bajo esta categoría ameritan observación y acciones sistemáticas de intervención para prevenir efectos perjudiciales en la salud.",
                    size: 23,
                    
                }),
            ],
            bullet: { level: 0 },
            
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Riesgo Bajo - Despreciable: No se espera que los factores psicosociales que obtengan puntuaciones de este nivel estén relacionados con síntomas o respuestas de estrés significativas. Las dimensiones que se encuentren bajo esta categoría serán objeto de acciones o programas de intervención, a fin de mantenerlos en los niveles de riesgo más bajos posibles.",
                    size: 23,
                    
                }),
            ],
            bullet: { level: 0 },
            
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Se califica los cuestionarios que se han aplicado para crear la base de datos, se         tabulan los resultados a través de la aplicación we www.riesgospsicosociales.com.co, creada para tal fin, de acuerdo con ello, se genera el presente informe analítico.",
                    size: 23,
                    
                }),
            ],
            spacing: {
              after: 400,
            },
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Fase III. Análisis de datos.",
                    size: 23,
                    
                }),
                new TextRun({
                  text: `A partir de la consolidación de la información, se aplican las fórmulas indicadas en el Manual General de la Batería de Instrumentos para la Evaluación de los  7 Factores de Riesgo Psicosocial para calcular el nivel de riesgo por cada uno de los  cuestionarios aplicados y de acuerdo con ello, se lleva a cabo el análisis  respectivo al comportamiento del riesgo psicosocial de ${nombreEmpresa?.textContent}`,
                  size: 23,
                  
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Fase IV. Generación del plan de acción.",
                    size: 23,
                    
                }),
                new TextRun({
                  text: "Posterior al análisis del perfil de riesgo, se obtienen pautas para plantear un plan de trabajo que permita realizar prevención y control del riesgo identificado, de forma efectiva. Este se debe orientar para cada Grupo de Trabajo de acuerdo con las características del riesgo, atendiendo a las necesidades específicas que presenta cada nivel de atención en cada una.",
                  size: 23,
                  
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),
          
        ];
        const finalPage = [
          // createWatermarkParagraph(),
          new Paragraph({
            text: "ACCIONES DE INTERVENCIÓN",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400,
            },
            
          
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "El estudio se realizó de manera general, y todas las conclusiones presentadas en este informe se encuentran fundamentadas en la Batería de Instrumentos para la Evaluación de Factores de riesgo Psicosocial entregada por el Ministerio de Protección Social en el año 2010.",
                    size: 23,
                })
            ],
            spacing: {
              after: 400,
            },
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
              children: [
                  new TextRun({
                      text: "En Reconocimiento En referencia a los principios y estrategias planteados por la Unión Europea y la OMS (2008) para la prevención y control de los factores de riesgo psicosocial en el trabajo, se proponen las siguientes estrategias de promoción y prevención clasificadas según los dominios de factores de riesgo psicosocial:",
                      size: 23,
                  })
              ],
              spacing: {
                after: 400,
              },
              alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
              children: [
                  new TextRun({
                      text: "RETROALIMENTACION DEL DESEMPEÑO",
                      size: 23,
                  })
              ],
              spacing: {
                after: 400,
              },
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Revisar el procedimiento para la evaluación del desempeño implementado en la empresa y ajustarlo en caso de ser necesario.",
                    size: 23,
                })
            ],
            spacing: {
              after: 400,
            },
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Capacitar al equipo de líderes en evaluación del desempeño y construcción de planes de mejoramiento individual con los colaboradores Construir con el Área de Talento Humano el procedimiento interno para hacer seguimiento a los planes de mejoramiento individual de los colaboradores.",

                    size: 23,
                })
            ],
            
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text: "Capacitar a los líderes en estrategias de retroalimentación asertivas y de motivación para el personal.",
                    size: 23,
                })
            ],
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text:  "Implementar plan de incentivos y reconocimientos por buen desempeño.",
                    size: 23,
                })
            ],
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
   
          new Paragraph({
              children: [
                  new TextRun({
                      text: "INFLUENCIA DEL TRABAJO POR EL ENTORNO EXTRALABORAL:",
                      size: 23,
                      
                  })
              ],   
              spacing: {
                after: 400,
              },         
          }),
          new Paragraph({
            children: [ new TextRun({
                      text: "Para este dominio se recomienda intervenir mediante un programa de manejo adecuado del tiempo, actividades y las relaciones interpersonales dentro y fuera del trabajo.",
                      size: 23,
                      
            })
            ],
              bullet: { level: 0 },
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 400,
              },
          }),
          new Paragraph({
            children: [ new TextRun({
                text: "CONSISTENCIA DEL ROL:",
                size: 23,
                
            })
            ],
            spacing: {
              after: 400,
            },
        
          }),
          new Paragraph({
            children: [ new TextRun({
              size: 23,
              
              text: "Establecer un método en el cual los empleados puedan dar sus opiniones en términos de mejora de las condiciones laborales que conlleven a mejorar los niveles de productividad.",
              })
              ],
              bullet: { level: 0 },
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                after: 400,
              },
          }),
          new Paragraph({
            children: [ new TextRun({
              size: 23,
              text: "RECOMPENSAS",
              
              })
              ],
              spacing: {
                after: 400,
              },
             
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text:  "Revisar la escala salarial y estudiar la posibilidad de hacer ajustes de acuerdo con el desempeño y las competencias de los colaboradores.",
                    size: 23,
                })
            ],
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text:  "Ofrecer incentivos económicos por buen desempeño.",
                    size: 23,
                })
            ],
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text:   "Fortalecer los servicios ofrecidos a través del programa de Bienestar laboral.",
                    size: 23,
                })
            ],
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
        
          new Paragraph({
            children: [ new TextRun({
              size: 23,
              
              text: "TIEMPO FUERA DEL TRABAJO:",
              })
              ],
              spacing: {
                after: 400,
              },
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text:   "Optimizar el tiempo que se está con la familia y amigos",
                    size: 23,
                })
            ],
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text:   "Realizar actividades lúdicas y recreativas",
                    size: 23,
                })
            ],
            spacing: {
              after: 400,
            },
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text:   "Generar procesos donde se puedan crear habilidades nuevas y potencializar las que ya están.",
                    size: 23,
                })
            ],
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
          
          new Paragraph({
            children: [ new TextRun({
              size: 23,
              
              text: "DESPLAZAMIENTO VIVIENDA / TRABAJO / VIVIENDA:",
              })
              ],
              spacing: {
                after: 400,
              },
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text:    "En lo posible flexibilizar horarios de trabajo",
                    size: 23,
                })
            ],
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children: [
                new TextRun({
                    text:   "Rutas empresariales",
                    size: 23,
                })
            ],
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: arrayBufferFirma,
                transformation: {
                  width:  canvasfirma.width ,
                  height: canvasfirma.height
                },
                type: "png"
              } as any),
              new TextRun({
                text: "_________________________________________",
                size: 23, // El tamaño se especifica en half-points (2 = 1pt), así que 30 = 15pt
                break: 1
              }),
              new TextRun({
                text: "Yury Paola Ochoa Díaz",
                size: 23, // El tamaño se especifica en half-points (2 = 1pt), así que 30 = 15pt
                break: 1
              }),
              new TextRun({
                text: "Psicóloga",
                size: 23,
                break: 1
              }),
              new TextRun({
                text: "Esp. Gerencia en salud y seguridad en el trabajo",
                size: 23,
                break: 1
              }),
              new TextRun({
                text: "Licencia 3861/2020",
                size: 23,
                break: 1
              })
            ],
            spacing: {
              after: 400,
            },
          }),
        ];

    
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
              const contenedor = chart.querySelectorAll('.contenedor');
              const pares = [] as string[];
              contenedor.forEach(container => {
                // Obtener los spans de riesgo y porcentaje
                const riesgos = container.querySelectorAll('.riesgo');
                const porcentajes = container.querySelectorAll('.porcentaje');
                
                // Combinar cada riesgo con su porcentaje correspondiente
                riesgos.forEach((riesgo, index) => {
                    if (porcentajes[index]) {
                        const textoRiesgo = riesgo.textContent?? '';
                        const textoPorcentaje = porcentajes[index].textContent?? '';
                        pares.push(`${textoRiesgo} ${textoPorcentaje}`);
                    }
                });
              });
              const textoAAgregar = pares.join(', ')
              imageParagraphs.push(
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: arrayBuffer,
                      transformation: {
                        width:  canvas.width /2,
                        height: canvas.height /2
                      },
                      type: "png"
                    } as any)
                  ]
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: textoAAgregar,
                      size: 23,
                      break: 1
                    })
                  ],
                  alignment: AlignmentType.CENTER,
                }),

              );
            }
          }
        }
    
        const doc = new Document({
          sections: [
            // Primera sección (página de presentación)
            {
              properties: {
                type: SectionType.NEXT_PAGE,
              },
              headers: {
                  default: header,
              },
              children: presentationPage,
             
            },
            // Segunda sección (página de introducción)
            {
              properties: {
                type: SectionType.NEXT_PAGE,
              },
              // headers: {
              //   default: header,
              // },
              children: introductionPage,
              
            },
            // Tercera sección (contenido principal con gráficos)
            
            {
              properties: {
                type: SectionType.NEXT_PAGE,
              },
              // headers: {
              //   default: header,
              // },
              children: objetivosPage,
              
            },
            {
              properties: {
                type: SectionType.NEXT_PAGE,
              },
              // headers: {
              //   default: header,
              // },
              children: justificacionPage,
              
            },
            {
              properties: {
                type: SectionType.NEXT_PAGE,
              },
              // headers: {
              //   default: header,
              // },
              children: marcolegalPage,
              
            },
            {
              properties: {
                type: SectionType.NEXT_PAGE,
              },
              // headers: {
              //   default: header,
              // },
              children: [
                // createWatermarkParagraph(),
                new Paragraph({
                  text: "Dashboard Principal A Report",
                  heading: HeadingLevel.HEADING_1,
                }),
                ...imageParagraphs
              ],
             
            },
            {
              properties: {
                type: SectionType.NEXT_PAGE,
              },
              // headers: {
              //   default: header,
              // },
              children: finalPage,
              
            },
            
          ],
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
        setIsDownloading(false);

      } catch (error) {
        setIsDownloading(false);

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
              disabled={isDownloading}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors
                ${isDownloading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-gray-100 text-white hover:text-green-500'
                }`}
            >
              {isDownloading ? (
                <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-5 h-5 transition-colors" />
              )}
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
                  <div className="flex items-center gap-2 mb-4 mt-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h1 className="text-3xl font-bold text-gray-800">FORMULARIO DATOS PERSONALES</h1>
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
                  <div className="flex items-center gap-2 mb-4 mt-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h1 className="text-3xl font-bold text-gray-800">FORMULARIO INTRALABORAL A</h1>
                  </div>
                  <div className="w-full flex flex-wrap gap-4" id="datosIntralaborlA">
                    {Object.values(DOMAIN_CONFIG).map(domain => (
                    <React.Fragment key={domain.key}>
                      <GraficoPie
                        key={domain.key}
                        chartData={resultadosIntraA.dominios[domain.label]}
                        title={`Dominio ${domain.label}`}
                        dataDimensiones={getDimensionDataA(domain.dimensions)}
                      />
                      {domain.dimensions.map(dimension => (
                          <GraficoPie
                          chartData={resultadosIntraA.dimensiones[dimension].riesgos}
                          title={DIMENSIONESTRANSFORMADAS[dimension as keyof typeof DIMENSIONESTRANSFORMADAS] || dimension}
                          hijo = {true}
                        />
                        ))}
                    </React.Fragment>
                    
                    ))}
                  </div>
                  
                  {currentIntraB.length > 0 && (
                  <section id="datosIntralaborlB">
                  <div className="flex items-center gap-2 mb-4 mt-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h1 className="text-3xl font-bold text-gray-800">FORMULARIO INTRALABORAL B</h1> 
                  </div>
                  <div className="w-full flex flex-wrap gap-4" >
                    {Object.values(DOMAIN_CONFIG).map(domain => (
                      <React.Fragment key={domain.key}>
                      <GraficoPie
                        chartData={resultadosIntraB.dominios[domain.label]}
                        title={domain.label}
                        dataDimensiones={getDimensionDataB(domain.dimensions)}
                      />
                      {domain.dimensions.map(dimension => (
                          <GraficoPie
                          chartData={resultadosIntraB.dimensiones[dimension].riesgos}
                          title={DIMENSIONESTRANSFORMADAS[dimension as keyof typeof DIMENSIONESTRANSFORMADAS] || dimension}
                          hijo = {true}
                        />
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                  </section>)}
                  <div className="flex items-center gap-2 mb-4 mt-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h1 className="text-3xl font-bold text-gray-800">FORMULARIO EXTRALABORAL</h1>
                  </div>
                  <div className="w-full flex flex-wrap gap-4" id="datosExtralaboral">
                    <GraficoPie 
                          chartData={resultadosExtralaboral.general.riesgos} 
                          title='Factores de Riesgo Extralaboral' 
                          dataDimensiones={dataDimensionesExtralaboral}
                      />
                     <GraficoPie 
                          chartData={resultadosExtralaboral.dimensiones['caracteristicasVivienda'].riesgos} 
                          title='Características de Vivienda' 
                          hijo = {true}
                      />
                      <GraficoPie 
                          chartData={resultadosExtralaboral.dimensiones['comunicacionRelaciones'].riesgos} 
                          title='Comunicación y Relaciones' 
                          hijo = {true}
                      />
                      <GraficoPie 
                          chartData={resultadosExtralaboral.dimensiones['desplazamientoVivienda'].riesgos} 
                          title='Desplazamiento Vivienda' 
                          hijo = {true}
                      />
                      <GraficoPie 
                          chartData={resultadosExtralaboral.dimensiones['influenciaEntorno'].riesgos} 
                          title='Influencia Entorno' 
                          hijo = {true}
                      />
                      <GraficoPie 
                          chartData={resultadosExtralaboral.dimensiones['relacionesFamiliares'].riesgos} 
                          title='Relaciones Familiares' 
                          hijo = {true}
                      />
                      <GraficoPie 
                          chartData={resultadosExtralaboral.dimensiones['situacionEconomica'].riesgos} 
                          title='Situación Económica' 
                          hijo = {true}
                      />
                       <GraficoPie 
                          chartData={resultadosExtralaboral.dimensiones['tiempoFueraTrabajo'].riesgos} 
                          title='Tiempo Fuera del Trabajo' 
                          hijo = {true}
                      />
                     
                  </div>
                  <div className="flex items-center gap-2 mb-4 mt-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h1 className="text-3xl font-bold text-gray-800">FORMULARIO ESTRÉS</h1>
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

