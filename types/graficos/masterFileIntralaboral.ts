// ######################################## TYPOS  

export type RiskLevel = 'muyAlto' | 'alto' | 'medio' | 'bajo' | 'sinRiesgo';

export type RiskCount = {
  riesgo: RiskLevel;
  personas: number;
  fill: string;
}

export type GeneralResult = {
  riesgos: RiskCount[];
  promedioTotal: number;
}

export type DimensionResult = {
  riesgos: RiskCount[];
  promedio: number;
}

export type ProcessedResults = {
  general: GeneralResult;
  dominios: {
    [key: string]: RiskCount[];
  };
  dimensiones: {
    [key: string]: DimensionResult;
  };
}

export type DimensionData = {
  titulo: string;
  valor: number;
  color: string;
}

export type DomainConfig = {
  key: string;
  label: string;
  dimensions: string[];
}

// ######################################## CONFIGURACIONES

export const DIMENSIONESTRANSFORMADAS = {
  capacitacionEntrenamiento: 'Capacitación y Entrenamiento',
  claridadRol: 'Claridad de Rol',
  controlAutonomia: 'Control y Autonomía',
  oportunidadesDesarrollo: 'Oportunidades de Desarrollo',
  participacionCambios: 'Participación en Cambios',
  consistenciaRol: 'Consistencia de Rol',
  demandaCargaMental: 'Demanda de Carga Mental',
  demandasAmbientalesCarga: 'Demandas Ambientales de Carga',
  demandasCuantitativas: 'Demandas Cuantitativas',
  demandasEmocionales: 'Demandas Emocionales',
  demandasJornada: 'Demandas de Jornada',
  influenciaTrabajo: 'Influencia en el Trabajo',
  responsabilidadCargo: 'Responsabilidad de Cargo',
  caracteristicasLiderazgo: 'Características de Liderazgo',
  relacionColaboradores: 'Relación con Colaboradores',
  relacionesSociales: 'Relaciones Sociales',
  retroalimentacionDesempeno: 'Retroalimentación de Desempeño',
  recompensasPertenencia: 'Recompensas de Pertenencia',
  recompensasReconocimiento: 'Recompensas de Reconocimiento'
}


export const DOMAIN_CONFIG: Record<string, DomainConfig> = {
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

// ######################################## FUNCIONES

export function formatDimensionTitle(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
}

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
    { riesgo: "muyAlto" as RiskLevel, personas: counts.muyAlto, fill: "hsl(0 90% 50%)" },
    { riesgo: "alto" as RiskLevel, personas: counts.alto, fill: "hsl(0 84% 60%)" },
    { riesgo: "medio" as RiskLevel, personas: counts.medio, fill: "hsl( 32 95% 44%)" },
    { riesgo: "bajo" as RiskLevel, personas: counts.bajo, fill: "hsl(174 72% 56%)" },
    { riesgo: "sinRiesgo" as RiskLevel, personas: counts.sinRiesgo, fill: "hsl(142 72% 29%)" }
  ];
}

function calcularPromedio(items: number[]): number {
  if (items.length === 0) return 0;
  const suma = items.reduce((acc, val) => acc + (val || 0), 0);
  return Number((suma / items.length).toFixed(2));
}

export function processFormularios(formularios: any[]): ProcessedResults {
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
