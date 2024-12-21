
type NivelRiesgo = {
  min: number;
  max: number;
  nivel: string;
};



type DominiosIntralaboral = 
  | 'liderazgoRelacionesSociales'
  | 'controlSobreTrabajo'
  | 'demandasTrabajo'
  | 'recompensas';

type DimensionesIntralaboral = 
  | 'caracteristicasLiderazgo'
  | 'relacionesSociales'
  | 'retroalimentacionDesempeno'
  | 'relacionColaboradores'
  | 'claridadRol'
  | 'capacitacionEntrenamiento'
  | 'participacionCambios'
  | 'oportunidadesDesarrollo'
  | 'controlAutonomia'
  | 'demandasAmbientalesCarga'
  | 'demandasEmocionales'
  | 'demandasCuantitativas'
  | 'influenciaTrabajo'
  | 'responsabilidadCargo'
  | 'demandaCargaMental'
  | 'consistenciaRol'
  | 'demandasJornada'
  | 'recompensasPertenencia'
  | 'recompensasReconocimiento';

  type RangosDimensionIntralaboral = {
    [key in DimensionesIntralaboral]: NivelRiesgo[];
  };
  
  type RangosDominioIntralaboral = {
    [key in DominiosIntralaboral]: NivelRiesgo[];
  };
  
  type RangosPorDominioIntralaboral = {
    [key in TipoForm]: RangosDominioIntralaboral;
  };
  type RangosPorDimensionIntralaboral = {
    [key in TipoForm]: RangosDimensionIntralaboral;
  };

  export const getRangosIntralaboralTotal = (tipoForm: TipoForm): NivelRiesgo[] => {
  const rangos = {
    'A': [
      { min: 0.0, max: 19.7, nivel: 'sinRiesgo' },
      { min: 19.8, max: 25.8, nivel: 'bajo' },
      { min: 25.9, max: 31.5, nivel: 'medio' },
      { min: 31.6, max: 38.0, nivel: 'alto' },
      { min: 38.1, max: 100, nivel: 'muyAlto' }
    ],
    'B': [
      { min: 0.0, max: 20.6, nivel: 'sinRiesgo' },
      { min: 20.7, max: 26.0, nivel: 'bajo' },
      { min: 26.1, max: 31.2, nivel: 'medio' },
      { min: 31.3, max: 38.7, nivel: 'alto' },
      { min: 38.8, max: 100, nivel: 'muyAlto' }
    ]
  };
  return rangos[tipoForm];
};

export const getRangosIntralaboralDominio = (tipoForm: TipoForm, dominio: DominiosIntralaboral): NivelRiesgo[] => {
  const rangos: RangosPorDominioIntralaboral = {
    'A': {
      liderazgoRelacionesSociales: [
        { min: 0.0, max: 9.1, nivel: 'sinRiesgo' },
        { min: 9.2, max: 17.7, nivel: 'bajo' },
        { min: 17.8, max: 25.6, nivel: 'medio' },
        { min: 25.7, max: 34.8, nivel: 'alto' },
        { min: 34.9, max: 100, nivel: 'muyAlto' }
      ],
      controlSobreTrabajo: [
        { min: 0.0, max: 10.7, nivel: 'sinRiesgo' },
        { min: 10.8, max: 19.0, nivel: 'bajo' },
        { min: 19.1, max: 29.8, nivel: 'medio' },
        { min: 29.9, max: 40.5, nivel: 'alto' },
        { min: 40.6, max: 100, nivel: 'muyAlto' }
      ],
      demandasTrabajo: [
        { min: 0.0, max: 28.5, nivel: 'sinRiesgo' },
        { min: 28.6, max: 35.0, nivel: 'bajo' },
        { min: 35.1, max: 41.5, nivel: 'medio' },
        { min: 41.6, max: 47.5, nivel: 'alto' },
        { min: 47.6, max: 100, nivel: 'muyAlto' }
      ],
      recompensas: [
        { min: 0.0, max: 4.5, nivel: 'sinRiesgo' },
        { min: 4.6, max: 11.4, nivel: 'bajo' },
        { min: 11.5, max: 20.5, nivel: 'medio' },
        { min: 20.6, max: 29.5, nivel: 'alto' },
        { min: 29.6, max: 100, nivel: 'muyAlto' }
      ]
    },
    'B': {
      liderazgoRelacionesSociales: [
        { min: 0.0, max: 8.3, nivel: 'sinRiesgo' },
        { min: 8.4, max: 17.5, nivel: 'bajo' },
        { min: 17.6, max: 26.7, nivel: 'medio' },
        { min: 26.8, max: 38.3, nivel: 'alto' },
        { min: 38.4, max: 100, nivel: 'muyAlto' }
      ],
      controlSobreTrabajo: [
        { min: 0.0, max: 19.4, nivel: 'sinRiesgo' },
        { min: 19.5, max: 26.4, nivel: 'bajo' },
        { min: 26.5, max: 34.7, nivel: 'medio' },
        { min: 34.8, max: 43.1, nivel: 'alto' },
        { min: 43.2, max: 100, nivel: 'muyAlto' }
      ],
      demandasTrabajo: [
        { min: 0.0, max: 26.9, nivel: 'sinRiesgo' },
        { min: 27.0, max: 33.3, nivel: 'bajo' },
        { min: 33.4, max: 37.8, nivel: 'medio' },
        { min: 37.9, max: 44.2, nivel: 'alto' },
        { min: 44.3, max: 100, nivel: 'muyAlto' }
      ],
      recompensas: [
        { min: 0.0, max: 2.5, nivel: 'sinRiesgo' },
        { min: 2.6, max: 10.0, nivel: 'bajo' },
        { min: 10.1, max: 17.5, nivel: 'medio' },
        { min: 17.6, max: 27.5, nivel: 'alto' },
        { min: 27.6, max: 100, nivel: 'muyAlto' }
      ]
    }
  };

  return rangos[tipoForm][dominio];
};

export const getRangosIntralaboralDimension = (tipoForm: TipoForm, dimension: DimensionesIntralaboral): NivelRiesgo[] => {
  const rangos: RangosPorDimensionIntralaboral = {
    'A': {
      caracteristicasLiderazgo: [
        { min: 0.0, max: 3.8, nivel: 'sinRiesgo' },
        { min: 3.9, max: 15.4, nivel: 'bajo' },
        { min: 15.5, max: 30.8, nivel: 'medio' },
        { min: 30.9, max: 46.2, nivel: 'alto' },
        { min: 46.3, max: 100, nivel: 'muyAlto' }
      ],
      relacionesSociales: [
        { min: 0.0, max: 5.4, nivel: 'sinRiesgo' },
        { min: 5.5, max: 16.1, nivel: 'bajo' },
        { min: 16.2, max: 25.0, nivel: 'medio' },
        { min: 25.1, max: 37.5, nivel: 'alto' },
        { min: 37.6, max: 100, nivel: 'muyAlto' }
      ],
      retroalimentacionDesempeno: [
        { min: 0.0, max: 10.0, nivel: 'sinRiesgo' },
        { min: 10.1, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 40.0, nivel: 'medio' },
        { min: 40.1, max: 55.0, nivel: 'alto' },
        { min: 55.1, max: 100, nivel: 'muyAlto' }
      ],
      relacionColaboradores: [
        { min: 0.0, max: 13.9, nivel: 'sinRiesgo' },
        { min: 14.0, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 33.3, nivel: 'medio' },
        { min: 33.4, max: 47.2, nivel: 'alto' },
        { min: 47.3, max: 100, nivel: 'muyAlto' }
      ],
      claridadRol: [
        { min: 0.0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1.0, max: 10.7, nivel: 'bajo' },
        { min: 10.8, max: 21.4, nivel: 'medio' },
        { min: 21.5, max: 39.3, nivel: 'alto' },
        { min: 39.4, max: 100, nivel: 'muyAlto' }
      ],
      capacitacionEntrenamiento: [
        { min: 0.0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1.0, max: 16.7, nivel: 'bajo' },
        { min: 16.8, max: 33.3, nivel: 'medio' },
        { min: 33.4, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100, nivel: 'muyAlto' }
      ],
      participacionCambios: [
        { min: 0.0, max: 12.5, nivel: 'sinRiesgo' },
        { min: 12.6, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 37.5, nivel: 'medio' },
        { min: 37.6, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100, nivel: 'muyAlto' }
      ],
      oportunidadesDesarrollo: [
        { min: 0.0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1.0, max: 6.3, nivel: 'bajo' },
        { min: 6.4, max: 18.8, nivel: 'medio' },
        { min: 18.9, max: 31.3, nivel: 'alto' },
        { min: 31.4, max: 100, nivel: 'muyAlto' }
      ],
      controlAutonomia: [
        { min: 0.0, max: 8.3, nivel: 'sinRiesgo' },
        { min: 8.4, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 41.7, nivel: 'medio' },
        { min: 41.8, max: 58.3, nivel: 'alto' },
        { min: 58.4, max: 100, nivel: 'muyAlto' }
      ],
      demandasAmbientalesCarga: [
        { min: 0.0, max: 14.6, nivel: 'sinRiesgo' },
        { min: 14.7, max: 22.9, nivel: 'bajo' },
        { min: 23.0, max: 31.3, nivel: 'medio' },
        { min: 31.4, max: 39.6, nivel: 'alto' },
        { min: 39.7, max: 100, nivel: 'muyAlto' }
      ],
      demandasEmocionales: [
        { min: 0.0, max: 16.7, nivel: 'sinRiesgo' },
        { min: 16.8, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 33.3, nivel: 'medio' },
        { min: 33.4, max: 47.2, nivel: 'alto' },
        { min: 47.3, max: 100, nivel: 'muyAlto' }
      ],
      demandasCuantitativas: [
        { min: 0.0, max: 25.0, nivel: 'sinRiesgo' },
        { min: 25.1, max: 33.3, nivel: 'bajo' },
        { min: 33.4, max: 45.8, nivel: 'medio' },
        { min: 45.9, max: 54.2, nivel: 'alto' },
        { min: 54.3, max: 100, nivel: 'muyAlto' }
      ],
      influenciaTrabajo: [
        { min: 0.0, max: 18.8, nivel: 'sinRiesgo' },
        { min: 18.9, max: 31.3, nivel: 'bajo' },
        { min: 31.4, max: 43.8, nivel: 'medio' },
        { min: 43.9, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100, nivel: 'muyAlto' }
      ],
      responsabilidadCargo: [
        { min: 0.0, max: 37.5, nivel: 'sinRiesgo' },
        { min: 37.6, max: 54.2, nivel: 'bajo' },
        { min: 54.3, max: 66.7, nivel: 'medio' },
        { min: 66.8, max: 79.2, nivel: 'alto' },
        { min: 79.3, max: 100, nivel: 'muyAlto' }
      ],
      demandaCargaMental: [
        { min: 0.0, max: 60.0, nivel: 'sinRiesgo' },
        { min: 60.1, max: 70.0, nivel: 'bajo' },
        { min: 70.1, max: 80.0, nivel: 'medio' },
        { min: 80.1, max: 90.0, nivel: 'alto' },
        { min: 90.1, max: 100, nivel: 'muyAlto' }
      ],
      consistenciaRol: [
        { min: 0.0, max: 15.0, nivel: 'sinRiesgo' },
        { min: 15.1, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 35.0, nivel: 'medio' },
        { min: 35.1, max: 45.0, nivel: 'alto' },
        { min: 45.1, max: 100, nivel: 'muyAlto' }
      ],
      demandasJornada: [
        { min: 0.0, max: 8.3, nivel: 'sinRiesgo' },
        { min: 8.4, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 33.3, nivel: 'medio' },
        { min: 33.4, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100, nivel: 'muyAlto' }
      ],
      recompensasPertenencia: [
        { min: 0.0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1.0, max: 5.0, nivel: 'bajo' },
        { min: 5.1, max: 10.0, nivel: 'medio' },
        { min: 10.1, max: 20.0, nivel: 'alto' },
        { min: 20.1, max: 100, nivel: 'muyAlto' }
      ],
      recompensasReconocimiento: [
        { min: 0.0, max: 4.2, nivel: 'sinRiesgo' },
        { min: 4.3, max: 16.7, nivel: 'bajo' },
        { min: 16.8, max: 25.0, nivel: 'medio' },
        { min: 25.1, max: 37.5, nivel: 'alto' },
        { min: 37.6, max: 100, nivel: 'muyAlto' }
      ]
    },
    'B': {
      caracteristicasLiderazgo: [
        { min: 0.0, max: 3.8, nivel: 'sinRiesgo' },
        { min: 3.9, max: 13.5, nivel: 'bajo' },
        { min: 13.6, max: 25.0, nivel: 'medio' },
        { min: 25.1, max: 38.5, nivel: 'alto' },
        { min: 38.6, max: 100, nivel: 'muyAlto' }
      ],
      relacionesSociales: [
        { min: 0.0, max: 6.3, nivel: 'sinRiesgo' },
        { min: 6.4, max: 14.6, nivel: 'bajo' },
        { min: 14.7, max: 27.1, nivel: 'medio' },
        { min: 27.2, max: 37.5, nivel: 'alto' },
        { min: 37.6, max: 100, nivel: 'muyAlto' }
      ],
      retroalimentacionDesempeno: [
        { min: 0.0, max: 5.0, nivel: 'sinRiesgo' },
        { min: 5.1, max: 20.0, nivel: 'bajo' },
        { min: 20.1, max: 30.0, nivel: 'medio' },
        { min: 30.1, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100, nivel: 'muyAlto' }
      ],
      claridadRol: [
        { min: 0.0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1.0, max: 5.0, nivel: 'bajo' },
        { min: 5.1, max: 15.0, nivel: 'medio' },
        { min: 15.1, max: 30.0, nivel: 'alto' },
        { min: 30.1, max: 100, nivel: 'muyAlto' }
      ],
      capacitacionEntrenamiento: [
        { min: 0.0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1.0, max: 16.7, nivel: 'bajo' },
        { min: 16.8, max: 25.0, nivel: 'medio' },
        { min: 25.1, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100, nivel: 'muyAlto' }
      ],
      participacionCambios: [
        { min: 0.0, max: 16.7, nivel: 'sinRiesgo' },
        { min: 16.8, max: 33.3, nivel: 'bajo' },
        { min: 33.4, max: 41.7, nivel: 'medio' },
        { min: 41.8, max: 58.3, nivel: 'alto' },
        { min: 58.4, max: 100, nivel: 'muyAlto' }
      ],
      oportunidadesDesarrollo: [
        { min: 0.0, max: 12.5, nivel: 'sinRiesgo' },
        { min: 12.6, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 37.5, nivel: 'medio' },
        { min: 37.6, max: 56.3, nivel: 'alto' },
        { min: 56.4, max: 100, nivel: 'muyAlto' }
      ],
      controlAutonomia: [
        { min: 0.0, max: 33.3, nivel: 'sinRiesgo' },
        { min: 33.4, max: 50.0, nivel: 'bajo' },
        { min: 50.1, max: 66.7, nivel: 'medio' },
        { min: 66.8, max: 75.0, nivel: 'alto' },
        { min: 75.1, max: 100, nivel: 'muyAlto' }
      ],
      demandasAmbientalesCarga: [
        { min: 0.0, max: 22.9, nivel: 'sinRiesgo' },
        { min: 23.0, max: 31.3, nivel: 'bajo' },
        { min: 31.4, max: 39.6, nivel: 'medio' },
        { min: 39.7, max: 47.9, nivel: 'alto' },
        { min: 48.0, max: 100, nivel: 'muyAlto' }
      ],
      demandasEmocionales: [
        { min: 0.0, max: 19.4, nivel: 'sinRiesgo' },
        { min: 19.5, max: 27.8, nivel: 'bajo' },
        { min: 27.9, max: 38.9, nivel: 'medio' },
        { min: 39.0, max: 47.2, nivel: 'alto' },
        { min: 47.3, max: 100, nivel: 'muyAlto' }
      ],
      demandasCuantitativas: [
        { min: 0.0, max: 16.7, nivel: 'sinRiesgo' },
        { min: 16.8, max: 33.3, nivel: 'bajo' },
        { min: 33.4, max: 41.7, nivel: 'medio' },
        { min: 41.8, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100, nivel: 'muyAlto' }
      ],
      influenciaTrabajo: [
        { min: 0.0, max: 12.5, nivel: 'sinRiesgo' },
        { min: 12.6, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 31.3, nivel: 'medio' },
        { min: 31.4, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100, nivel: 'muyAlto' }
      ],
      demandaCargaMental: [
        { min: 0.0, max: 50.0, nivel: 'sinRiesgo' },
        { min: 50.1, max: 65.0, nivel: 'bajo' },
        { min: 65.1, max: 75.0, nivel: 'medio' },
        { min: 75.1, max: 85.0, nivel: 'alto' },
        { min: 85.1, max: 100, nivel: 'muyAlto' }
      ],
      demandasJornada: [
        { min: 0.0, max: 25.0, nivel: 'sinRiesgo' },
        { min: 25.1, max: 37.5, nivel: 'bajo' },
        { min: 37.6, max: 45.8, nivel: 'medio' },
        { min: 45.9, max: 58.3, nivel: 'alto' },
        { min: 58.4, max: 100, nivel: 'muyAlto' }
      ],
      recompensasPertenencia: [
        { min: 0.0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1.0, max: 6.3, nivel: 'bajo' },
        { min: 6.4, max: 12.5, nivel: 'medio' },
        { min: 12.6, max: 18.8, nivel: 'alto' },
        { min: 18.9, max: 100, nivel: 'muyAlto' }
      ],
      recompensasReconocimiento: [
        { min: 0.0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1.0, max: 12.5, nivel: 'bajo' },
        { min: 12.6, max: 25.0, nivel: 'medio' },
        { min: 25.1, max: 37.5, nivel: 'alto' },
        { min: 37.6, max: 100, nivel: 'muyAlto' }
      ],
      relacionColaboradores: [
        { min: 0.0, max: 3.8, nivel: 'sinRiesgo' },
        { min: 3.9, max: 13.5, nivel: 'bajo' },
        { min: 13.6, max: 25.0, nivel: 'medio' },
        { min: 25.1, max: 38.5, nivel: 'alto' },
        { min: 38.6, max: 100, nivel: 'muyAlto' }
      ],
      consistenciaRol: [
        { min: 0.0, max: 3.8, nivel: 'sinRiesgo' },
        { min: 3.9, max: 13.5, nivel: 'bajo' },
        { min: 13.6, max: 25.0, nivel: 'medio' },
        { min: 25.1, max: 38.5, nivel: 'alto' },
        { min: 38.6, max: 100, nivel: 'muyAlto' }
      ],
      responsabilidadCargo: [
        { min: 0.0, max: 3.8, nivel: 'sinRiesgo' },
        { min: 3.9, max: 13.5, nivel: 'bajo' },
        { min: 13.6, max: 25.0, nivel: 'medio' },
        { min: 25.1, max: 38.5, nivel: 'alto' },
        { min: 38.6, max: 100, nivel: 'muyAlto' }
      ],
   },
  };

  return rangos[tipoForm][dimension];
};

type Dimensiones = 
  | 'tiempoFueraTrabajo'
  | 'relacionesFamiliares'
  | 'comunicacionRelaciones'
  | 'situacionEconomica'
  | 'caracteristicasVivienda'
  | 'influenciaEntorno'
  | 'desplazamientoVivienda';


type TipoForm = 'A' | 'B';

type RangosPorDimension = {
  [key in Dimensiones]: NivelRiesgo[];
};


type Rangos = {
  [key in TipoForm]: RangosPorDimension;
};

export const getRangosExtralaboralFinal = (tipoForm: TipoForm): NivelRiesgo[] => {
  const rangos: RangosFinales = {
    'A': [
      { min: 0, max: 11.3, nivel: 'sinRiesgo' },
      { min: 11.4, max: 16.9, nivel: 'bajo' },
      { min: 17, max: 22.6, nivel: 'medio' },
      { min: 22.7, max: 29, nivel: 'alto' },
      { min: 29.1, max: 100.1, nivel: 'muyAlto' }
    ],
    'B': [
      { min: 0, max: 12.9, nivel: 'sinRiesgo' },
      { min: 13, max: 17.7, nivel: 'bajo' },
      { min: 17.8, max: 24.2, nivel: 'medio' },
      { min: 24.3, max: 32.3, nivel: 'alto' },
      { min: 32.4, max: 100.1, nivel: 'muyAlto' }
    ]
  };

  return rangos[tipoForm];
}

export const getRangosRiesgoExtralaboral = (tipoForm: TipoForm, dimension: Dimensiones): NivelRiesgo[] => {
  const rangos: Rangos = {
    'A': {
      tiempoFueraTrabajo: [
        { min: 0, max: 6.3, nivel: 'sinRiesgo' },
        { min: 6.4, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 37.5, nivel: 'medio' },
        { min: 37.6, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100.0, nivel: 'muyAlto' }
      ],
      relacionesFamiliares: [
        { min: 0, max: 8.3, nivel: 'sinRiesgo' },
        { min: 8.4, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 33.3, nivel: 'medio' },
        { min: 33.4, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100.0, nivel: 'muyAlto' }
      ],
      comunicacionRelaciones: [
        { min: 0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1, max: 10, nivel: 'bajo' },
        { min: 10.1, max: 20, nivel: 'medio' },
        { min: 20.1, max: 30.0, nivel: 'alto' },
        { min: 30.1, max: 100.0, nivel: 'muyAlto' }
      ],
      situacionEconomica: [
        { min: 0, max: 8.3, nivel: 'sinRiesgo' },
        { min: 8.4, max: 25, nivel: 'bajo' },
        { min: 25.1, max: 33.3, nivel: 'medio' },
        { min: 33.4, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100.0, nivel: 'muyAlto' }
      ],
      caracteristicasVivienda: [
        { min: 0, max: 5.6, nivel: 'sinRiesgo' },
        { min: 5.7, max: 11.1, nivel: 'bajo' },
        { min: 11.2, max: 13.9, nivel: 'medio' },
        { min: 14.0, max: 22.2, nivel: 'alto' },
        { min: 22.3, max: 100.0, nivel: 'muyAlto' }
      ],
      influenciaEntorno: [
        { min: 0, max: 8.3, nivel: 'sinRiesgo' },
        { min: 8.4, max: 16.7, nivel: 'bajo' },
        { min: 16.8, max: 25, nivel: 'medio' },
        { min: 25.1, max: 41.7, nivel: 'alto' },
        { min: 41.8, max: 100.0, nivel: 'muyAlto' }
      ],
      desplazamientoVivienda: [
        { min: 0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1, max: 12.5, nivel: 'bajo' },
        { min: 12.6, max: 25.0, nivel: 'medio' },
        { min: 25.1, max: 43.8, nivel: 'alto' },
        { min: 43.9, max: 100.0, nivel: 'muyAlto' }
      ]
    },
    'B': {
      tiempoFueraTrabajo: [
        { min: 0, max: 6.3, nivel: 'sinRiesgo' },
        { min: 6.4, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 37.5, nivel: 'medio' },
        { min: 37.6, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100.0, nivel: 'muyAlto' }
      ],
      relacionesFamiliares: [
        { min: 0, max: 8.3, nivel: 'sinRiesgo' },
        { min: 8.4, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 33.3, nivel: 'medio' },
        { min: 33.4, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100.0, nivel: 'muyAlto' }
      ],
      comunicacionRelaciones: [
        { min: 0, max: 5, nivel: 'sinRiesgo' },
        { min: 5.1, max: 15, nivel: 'bajo' },
        { min: 15.1, max: 25.0, nivel: 'medio' },
        { min: 25.1, max: 35, nivel: 'alto' },
        { min: 35.1, max: 100.0, nivel: 'muyAlto' }
      ],
      situacionEconomica: [
        { min: 0, max: 16.7, nivel: 'sinRiesgo' },
        { min: 16.8, max: 25.0, nivel: 'bajo' },
        { min: 25.1, max: 41.7, nivel: 'medio' },
        { min: 41.8, max: 50.0, nivel: 'alto' },
        { min: 50.1, max: 100.0, nivel: 'muyAlto' }
      ],
      caracteristicasVivienda: [
        { min: 0, max: 5.6, nivel: 'sinRiesgo' },
        { min: 5.7, max: 11.1, nivel: 'bajo' },
        { min: 11.2, max: 16.7, nivel: 'medio' },
        { min: 16.8, max: 27.8, nivel: 'alto' },
        { min: 27.9, max: 100.0, nivel: 'muyAlto' }
      ],
      influenciaEntorno: [
        { min: 0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1, max: 16.7, nivel: 'bajo' },
        { min: 16.8, max: 25, nivel: 'medio' },
        { min: 25.1, max: 41.7, nivel: 'alto' },
        { min: 41.8, max: 100.0, nivel: 'muyAlto' }
      ],
      desplazamientoVivienda: [
        { min: 0, max: 0.9, nivel: 'sinRiesgo' },
        { min: 1, max: 12.5, nivel: 'bajo' },
        { min: 12.6, max: 25.0, nivel: 'medio' },
        { min: 25.1, max: 43.8, nivel: 'alto' },
        { min: 43.9, max: 100.0, nivel: 'muyAlto' }
      ]
    }
  };

  return rangos[tipoForm][dimension];
};

export const getNivelRiesgo = (puntaje: number, rangos: NivelRiesgo[]):string => {
    for (const rango of rangos) {
      if (puntaje >= rango.min && puntaje <= rango.max) {
        return rango.nivel;
      }
    }
    return 'No clasificado';
  
  };

type RangosFinales = {
    [key in TipoForm]: NivelRiesgo[];
  };
export const getRangosRiesgoEstres = (tipoForm: TipoForm): NivelRiesgo[] => {
  const rangos: RangosFinales = {
    'A': [
      { min: 0, max: 7.8, nivel: 'sinRiesgo' },
      { min: 7.9, max: 12.6, nivel: 'bajo' },
      { min: 12.7, max: 17.7, nivel: 'medio' },
      { min: 17.8, max: 25, nivel: 'alto' },
      { min: 25.1, max: 101, nivel: 'muyAlto' }
    ],
    'B': [
      { min: 0, max: 6.5, nivel: 'sinRiesgo' },
      { min: 6.6, max: 11.8, nivel: 'bajo' },
      { min: 11.9, max: 17, nivel: 'medio' },
      { min: 17.1, max: 23.4, nivel: 'alto' },
      { min: 23.5, max: 101, nivel: 'muyAlto' }
    ]
  };

  return rangos[tipoForm];
}


// type DimensionesEstres = 
//   | 'sintomasFisiologicos'
//   | 'comportamientoSocial'
//   | 'sintomasLaborales'
//   | 'sintomasPsicoemocionales';

// type RangosPorDimensionEstres = {
//     [key in DimensionesEstres]: NivelRiesgo[];
//   };
// type RangosEstres = {
//     [key in TipoForm]: RangosPorDimensionEstres;
//   };

//   export const getRangosRiesgoEstres = (tipoForm: TipoForm, dimension: DimensionesEstres): NivelRiesgo[] => {
//     const rangos: RangosEstres = {
//       'A': {
//         sintomasFisiologicos: [
//           { min: 0, max: 6.3, nivel: 'sinRiesgo' },
//           { min: 6.4, max: 25.0, nivel: 'bajo' },
//           { min: 25.1, max: 37.5, nivel: 'medio' },
//           { min: 37.6, max: 50.0, nivel: 'alto' },
//           { min: 50.1, max: 100.0, nivel: 'muyAlto' }
//         ],
//         comportamientoSocial: [
//           { min: 0, max: 8.3, nivel: 'Sin riesgo' },
//           { min: 8.4, max: 25.0, nivel: 'bajo' },
//           { min: 25.1, max: 33.3, nivel: 'medio' },
//           { min: 33.4, max: 50.0, nivel: 'alto' },
//           { min: 50.1, max: 100.0, nivel: 'muyAlto' }
//         ],
//         sintomasLaborales: [
//           { min: 0, max: 5.0, nivel: 'Sin riesgo' },
//           { min: 5.1, max: 15.0, nivel: 'bajo' },
//           { min: 15.1, max: 25.0, nivel: 'medio' },
//           { min: 25.1, max: 35.0, nivel: 'alto' },
//           { min: 35.1, max: 100.0, nivel: 'muyAlto' }
//         ],
//         sintomasPsicoemocionales: [
//           { min: 0, max: 16.7, nivel: 'Sin riesgo' },
//           { min: 16.8, max: 25.0, nivel: 'bajo' },
//           { min: 25.1, max: 41.7, nivel: 'medio' },
//           { min: 41.8, max: 50.0, nivel: 'alto' },
//           { min: 50.1, max: 100.0, nivel: 'muyAlto' }
//         ]
//       },
//       'B': {
//         sintomasFisiologicos: [
//           { min: 0, max: 6.3, nivel: 'Sin riesgo' },
//           { min: 6.4, max: 25.0, nivel: 'bajo' },
//           { min: 25.1, max: 37.5, nivel: 'medio' },
//           { min: 37.6, max: 50.0, nivel: 'alto' },
//           { min: 50.1, max: 100.0, nivel: 'muyAlto' }
//         ],
//         comportamientoSocial: [
//           { min: 0, max: 8.3, nivel: 'Sin riesgo' },
//           { min: 8.4, max: 25.0, nivel: 'bajo' },
//           { min: 25.1, max: 33.3, nivel: 'medio' },
//           { min: 33.4, max: 50.0, nivel: 'alto' },
//           { min: 50.1, max: 100.0, nivel: 'muyAlto' }
//         ],
//         sintomasLaborales: [
//           { min: 0, max: 5.0, nivel: 'Sin riesgo' },
//           { min: 5.1, max: 15.0, nivel: 'bajo' },
//           { min: 15.1, max: 25.0, nivel: 'medio' },
//           { min: 25.1, max: 35.0, nivel: 'alto' },
//           { min: 35.1, max: 100.0, nivel: 'muyAlto' }
//         ],
//         sintomasPsicoemocionales: [
//           { min: 0, max: 16.7, nivel: 'Sin riesgo' },
//           { min: 16.8, max: 25.0, nivel: 'bajo' },
//           { min: 25.1, max: 41.7, nivel: 'medio' },
//           { min: 41.8, max: 50.0, nivel: 'alto' },
//           { min: 50.1, max: 100.0, nivel: 'muyAlto' }
//         ]
//       }
//     };
  
//     return rangos[tipoForm][dimension];
//   };