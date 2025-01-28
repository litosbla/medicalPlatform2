// Definición de tipos
export type RiskLevel = 'muyAlto' | 'alto' | 'medio' | 'bajo' | 'sinRiesgo';

export type RiskCount = {
    riesgo: RiskLevel;
    personas: number;
    fill: string;
}

export type DimensionResult = {
    riesgos: RiskCount[];
    promedio: number;
}

export type ProcessedResults = {
    general: {
        riesgos: RiskCount[];
        promedioTotal: number;
    };
    dimensiones: {
        [key: string]: DimensionResult;
    };
    dimensionesPie: {
        [key: string]: RiskCount[];
    };
}

export type DimensionData = {
    titulo: string;
    valor: number;
    color: string;
}

// Constantes
export const DIMENSIONES = [
    'caracteristicasVivienda',
    'comunicacionRelaciones',
    'desplazamientoVivienda',
    'influenciaEntorno',
    'relacionesFamiliares',
    'situacionEconomica',
    'tiempoFueraTrabajo'
] as const;

// Funciones utilitarias
export function countRiskLevels(items: (string | undefined)[]): RiskCount[] {
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
        { riesgo: "muyAlto", personas: counts.muyAlto, fill: "hsl(0 90% 50%)" },
        { riesgo: "alto", personas: counts.alto, fill: "hsl(0 84% 60%)" },
        { riesgo: "medio", personas: counts.medio, fill: "hsl( 32 95% 44%)" },
        { riesgo: "bajo", personas: counts.bajo, fill: "hsl(174 72% 56%)" },
        { riesgo: "sinRiesgo", personas: counts.sinRiesgo, fill: "hsl(142 72% 29%)" }
    ];
}

export function calcularPromedio(items: number[]): number {
    if (items.length === 0) return 0;
    const suma = items.reduce((acc, val) => acc + (val || 0), 0);
    return Number((suma / items.length).toFixed(2));
}

export function processFormulariosExtralaboral(formularios: any[]): ProcessedResults {
    const result: ProcessedResults = {
        general: {
            riesgos: [],
            promedioTotal: 0
        },
        dimensiones: {},
        dimensionesPie: {}

    };

    // Process general statistics
    result.general.riesgos = countRiskLevels(formularios.map(f => f.nivelRiesgoTotal));
    result.general.promedioTotal = calcularPromedio(formularios.map(f => f.puntajeTotal));


    // Process dimensions
    DIMENSIONES.forEach(dimension => {
        
        const dimensionData = formularios.map(f => f[dimension]?.nivelRiesgo);
        const puntajesTransformados = formularios.map(f => 
            f[dimension]?.puntajeTransformado
        ).filter(p => p !== undefined && p !== null);

        result.dimensiones[dimension] = {
            riesgos: countRiskLevels(dimensionData),
            promedio: calcularPromedio(puntajesTransformados)
        };
    });



    return result;
}