import React from 'react';
import GraficoPie from '@/components/graficopie';

// Tipos
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

type DimensionData = {
  titulo: string;
  valor: number;
  color: string;
}

// Configuración de dominios y dimensiones
const DOMAIN_CONFIG = {
  controlSobreTrabajo: {
    key: 'controlSobreTrabajo',
    label: 'Control sobre el Trabajo',
    dimensions: [
      'capacitacionEntrenamiento',
      'claridadRol',
      'controlAutonomia',
      'oportunidadesDesarrollo',
      'participacionCambios'
    ]
  },
  demandasTrabajo: {
    key: 'demandasTrabajo',
    label: 'Demandas del Trabajo',
    dimensions: [
      'consistenciaRol',
      'demandaCargaMental',
      'demandasAmbientalesCarga',
      'demandasCuantitativas',
      'demandasEmocionales',
      'demandasJornada',
      'influenciaTrabajo',
      'responsabilidadCargo'
    ]
  },
  liderazgoRelacionesSociales: {
    key: 'liderazgoRelacionesSociales',
    label: 'Liderazgo y Relaciones Sociales',
    dimensions: [
      'caracteristicasLiderazgo',
      'relacionColaboradores',
      'relacionesSociales',
      'retroalimentacionDesempeno'
    ]
  },
  recompensas: {
    key: 'recompensas',
    label: 'Recompensas',
    dimensions: [
      'recompensasPertenencia',
      'recompensasReconocimiento'
    ]
  }
};

// Componente principal
export default function DashboardRiesgos({
  datos,
  colorDimensiones = "text-blue-600",
  className = "w-full flex flex-col gap-4 flex-wrap"
}: {
  datos: any[];
  colorDimensiones?: string;
  className?: string;
}) {
  const resultados = processFormularios(datos);

  const getDimensionData = (dimensions: string[]): DimensionData[] => {
    return dimensions.map(dimension => ({
      titulo: formatDimensionTitle(dimension),
      valor: resultados.dimensiones[dimension]?.promedio || 0,
      color: colorDimensiones
    }));
  };

  return (
    <div className={className}>
      {Object.values(DOMAIN_CONFIG).map(domain => (
        <GraficoPie
          key={domain.key}
          chartData={resultados.dominios[domain.label]}
          title={domain.label}
          dataDimensiones={getDimensionData(domain.dimensions)}
        />
      ))}
    </div>
  );
}

// Funciones auxiliares
function formatDimensionTitle(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
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
  Object.values(DOMAIN_CONFIG).forEach(({ key, label }) => {
    result.dominios[label] = countRiskLevels(
      formularios.map(f => f[key]?.nivelRiesgo)
    );
  });

  // 3. Procesar por dimensión
  Object.entries(DOMAIN_CONFIG).forEach(([dominio, config]) => {
    config.dimensions.forEach(dimension => {
      const dimensionData = formularios.map(f => 
        f[dominio]?.dimensiones?.[dimension]?.nivelRiesgo
      );
      
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