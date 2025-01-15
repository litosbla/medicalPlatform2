import React from 'react'
import GraficoPie from '@/components/graficopie';


export default function DadgraficoIntrab({datos}:{datos:any[]}) {
    const resultados = processFormularios(datos);
    console.log("@@@@@@@@ resultadooooooss @@@@@@@@@@@@@@ formulario B")
    console.log(resultados);
    const dataDominioLiderazgo = [
        { 
            titulo: 'Características de Liderazgo', 
            valor: resultados.dimensiones.caracteristicasLiderazgo.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Relación con Colaboradores',
            valor: resultados.dimensiones.relacionColaboradores.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Relaciones Sociales',
            valor: resultados.dimensiones.relacionesSociales.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Retroalimentación del Desempeño',
            valor: resultados.dimensiones.retroalimentacionDesempeno.promedio,
            color: "text-blue-600"
        }
    ];
    const dataControlSobreTrabajo = [
        {
            titulo: 'Capacitación y Entrenamiento',
            valor: resultados.dimensiones.capacitacionEntrenamiento.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Claridad de Rol',
            valor: resultados.dimensiones.claridadRol.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Control y Autonomía',
            valor: resultados.dimensiones.controlAutonomia.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Oportunidades de Desarrollo',
            valor: resultados.dimensiones.oportunidadesDesarrollo.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Participación en Cambios',
            valor: resultados.dimensiones.participacionCambios.promedio,
            color: "text-blue-600"
        }
    ];

    const dataDemandasTrabajo = [
        {
            titulo: 'Consistencia de Rol',
            valor: resultados.dimensiones.consistenciaRol.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Demanda de Carga Mental',
            valor: resultados.dimensiones.demandaCargaMental.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Demandas Ambientales y Carga',
            valor: resultados.dimensiones.demandasAmbientalesCarga.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Demandas Cuantitativas',
            valor: resultados.dimensiones.demandasCuantitativas.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Demandas Emocionales',
            valor: resultados.dimensiones.demandasEmocionales.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Demandas de la Jornada',
            valor: resultados.dimensiones.demandasJornada.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Influencia del Trabajo',
            valor: resultados.dimensiones.influenciaTrabajo.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Responsabilidad del Cargo',
            valor: resultados.dimensiones.responsabilidadCargo.promedio,
            color: "text-blue-600"
        }
    ];

    const dataRecompensas = [
        {
            titulo: 'Recompensas y Pertenencia',
            valor: resultados.dimensiones.recompensasPertenencia.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Recompensas y Reconocimiento',
            valor: resultados.dimensiones.recompensasReconocimiento.promedio,
            color: "text-blue-600"
        }
    ];
    

  return (

    <div className='w-full flex flex-col gap-4 flex-wrap'>
       
        <GraficoPie chartData={resultados.dominios['Liderazgo y Relaciones Sociales']} title='Liderazgo y Relaciones Sociales en el Trabajo' dataDimensiones={dataDominioLiderazgo}/>
        <GraficoPie chartData={resultados.dominios['Control sobre el Trabajo']} title='Control sobre el Trabajo' dataDimensiones={dataControlSobreTrabajo}/>
        <GraficoPie chartData={resultados.dominios['Demandas del Trabajo']} title='Demandas del Trabajo' dataDimensiones={dataDemandasTrabajo}/>
        <GraficoPie chartData={resultados.dominios['Recompensas']} title='Recompensas' dataDimensiones={dataRecompensas}/>

    </div>

  )
}
type RiskLevel = 'muyAlto' | 'alto' | 'medio' | 'bajo' | 'sinRiesgo';

type RiskCount = {
  riesgo: RiskLevel;
  personas: number;
  fill: string;
}

type GeneralResult = {
  riesgos: RiskCount[];
  promedioTotal: number;
}

type DimensionResult = {
  riesgos: RiskCount[];
  promedio: number;
}

type ProcessedResults = {
  general: GeneralResult;
  dominios: {
    [key: string]: RiskCount[];
  };
  dimensiones: {
    [key: string]: DimensionResult;
  };
}

function processFormularios(formularios: any[]): ProcessedResults {
  function countRiskLevels(items: (string | undefined)[]): RiskCount[] {
    const counts = {
      muyAlto: 0,
      alto: 0,
      medio: 0,
      bajo: 0,
      sinRiesgo: 0
    };
    
    items.forEach(item => {
      if (item as keyof typeof counts in counts) {
        counts[item as keyof typeof counts]++;
      }
    });
    
    return [
      { riesgo: "muyAlto", personas: counts.muyAlto, fill: "var(--color-muyAlto)" },
      { riesgo: "alto", personas: counts.alto, fill: "var(--color-alto)" },
      { riesgo: "medio", personas: counts.medio, fill: "var(--color-medio)" },
      { riesgo: "bajo", personas: counts.bajo, fill: "var(--color-bajo)" },
      { riesgo: "sinRiesgo", personas: counts.sinRiesgo, fill: "var(--color-sinRiesgo)" }
    ];
  }

  function calcularPromedio(items: number[]): number {
    if (items.length === 0) return 0;
    const suma = items.reduce((acc, val) => acc + (val || 0), 0);
    return Number((suma / items.length).toFixed(2));
  }

  const result: ProcessedResults = {
    general: {
      riesgos: [],
      promedioTotal: 0
    },
    dominios: {},
    dimensiones: {}
  };

  // 1. Procesar estadísticas generales
  result.general.riesgos = countRiskLevels(formularios.map(f => f.nivelRiesgoTotal));
  result.general.promedioTotal = calcularPromedio(formularios.map(f => f.puntajeTotal));
  // 2. Procesar por dominio
  const dominios: Record<string, string> = {
    controlSobreTrabajo: 'Control sobre el Trabajo',
    demandasTrabajo: 'Demandas del Trabajo',
    liderazgoRelacionesSociales: 'Liderazgo y Relaciones Sociales',
    recompensas: 'Recompensas'
  };

  Object.entries(dominios).forEach(([key, label]) => {
    result.dominios[label] = countRiskLevels(
      formularios.map(f => f[key]?.nivelRiesgo)
    );
  });

  // 3. Procesar por dimensión
  const dimensiones: Record<string, string[]> = {
    controlSobreTrabajo: [
      'capacitacionEntrenamiento',
      'claridadRol',
      'controlAutonomia',
      'oportunidadesDesarrollo',
      'participacionCambios'
    ],
    demandasTrabajo: [
      'consistenciaRol',
      'demandaCargaMental',
      'demandasAmbientalesCarga',
      'demandasCuantitativas',
      'demandasEmocionales',
      'demandasJornada',
      'influenciaTrabajo',
      'responsabilidadCargo'
    ],
    liderazgoRelacionesSociales: [
      'caracteristicasLiderazgo',
      'relacionColaboradores',
      'relacionesSociales',
      'retroalimentacionDesempeno'
    ],
    recompensas: [
      'recompensasPertenencia',
      'recompensasReconocimiento'
    ]
  };

  Object.entries(dimensiones).forEach(([dominio, dims]) => {
    dims.forEach(dimension => {
      const dimensionData = formularios.map(f => 
        f[dominio]?.dimensiones?.[dimension]?.nivelRiesgo
      );
      
      // Calcular promedio del puntaje transformado
      const puntajesTransformados = formularios.map(f => 
        f[dominio]?.dimensiones?.[dimension]?.puntajeTransformado
      ).filter(p => p !== undefined && p !== null);
      
      result.dimensiones[dimension] = {
        riesgos: countRiskLevels(dimensionData),
        promedio: calcularPromedio(puntajesTransformados)
      };
    });
  });

  return result;
}