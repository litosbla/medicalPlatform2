import React from 'react';
import GraficoPie from '@/components/graficopie';

export default function DadgraficoExtra({datos}: {datos: any[]}) {
    const resultados = processFormularios(datos);
    
    const dataDimensiones = [
        {
            titulo: 'Características de Vivienda',
            valor: resultados.dimensiones.caracteristicasVivienda.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Comunicación y Relaciones',
            valor: resultados.dimensiones.comunicacionRelaciones.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Desplazamiento Vivienda',
            valor: resultados.dimensiones.desplazamientoVivienda.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Influencia Entorno',
            valor: resultados.dimensiones.influenciaEntorno.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Relaciones Familiares',
            valor: resultados.dimensiones.relacionesFamiliares.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Situación Económica',
            valor: resultados.dimensiones.situacionEconomica.promedio,
            color: "text-blue-600"
        },
        {
            titulo: 'Tiempo Fuera del Trabajo',
            valor: resultados.dimensiones.tiempoFueraTrabajo.promedio,
            color: "text-blue-600"
        }
    ];

    return (
        <div className='w-full flex flex-col gap-4 flex-wrap'>
            <GraficoPie 
                chartData={resultados.general.riesgos} 
                title='Factores de Riesgo Extralaboral' 
                dataDimensiones={dataDimensiones}
            />
        </div>
    );
}

type RiskLevel = 'muyAlto' | 'alto' | 'medio' | 'bajo' | 'sinRiesgo';

type RiskCount = {
    riesgo: RiskLevel;
    personas: number;
    fill: string;
}

type DimensionResult = {
    riesgos: RiskCount[];
    promedio: number;
}

type ProcessedResults = {
    general: {
        riesgos: RiskCount[];
        promedioTotal: number;
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
        dimensiones: {}
    };

    // Process general statistics
    result.general.riesgos = countRiskLevels(formularios.map(f => f.nivelRiesgoTotal));
    result.general.promedioTotal = calcularPromedio(formularios.map(f => f.puntajeTotal));

    // Process dimensions
    const dimensiones = [
        'caracteristicasVivienda',
        'comunicacionRelaciones',
        'desplazamientoVivienda',
        'influenciaEntorno',
        'relacionesFamiliares',
        'situacionEconomica',
        'tiempoFueraTrabajo'
    ];

    dimensiones.forEach(dimension => {
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