'use client'
import React from 'react'
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
 
const chartConfig = {
    personas: {
        label: "Personas",
    },
    alto: {
        label: "Alto Riesgo",
        color: "hsl(0 84% 60%)",
    },
    medio: {
        label: "Medio Riesgo",
        color: "hsl( 32 95% 44%)",
    },
    bajo: {
        label: "Bajo Riesgo",
        color: "hsl(174 72% 56%)",
    },
    sinRiesgo: {
        label: "Sin Riesgo",
        color: "hsl(142 72% 29%)",
    },
    muyAlto: {
        label: "Riesgo Muy Alto",
        color: "hsl(0 90% 50%)",
    }
} satisfies ChartConfig
type ChartItem = {
    riesgo: string;
    personas: number;
    fill: string;
  }
type CardProps = {
    title: string;
    description?: string;
    chartData: ChartItem[];
    dataDimensiones: any;
    className?: string;
  }

  type RiesgoItem = {
    riesgo: string;
    personas: number;
    fill: string;
}
interface DominioLiderazgo {
    titulo: string;
    valor: number;
    color: string;
  }


function GraficoPie({
    title,
    description="Evaluación Actual",
    chartData,
    dataDimensiones,
    className,
  }: CardProps) {
   
    console.log('DATTOOOOOOSSS CHATR DATA',chartData)
    const totalPersonas = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.personas, 0)
    }, [])
    const getRiesgoMasComun = React.useMemo(() => {
        return chartData.reduce((max, current) => 
            current.personas > max.personas ? current : max
        , chartData[0]);
    }, [chartData]);
    const formatRiesgo = (riesgo: string) => {
        const formatMap: { [key: string]: string } = {
            'alto': 'Riesgo Alto',
            'medio': 'Riesgo Medio',
            'bajo': 'Riesgo Bajo',
            'sinRiesgo': 'Sin Riesgo',
            'muyAlto': 'Riesgo Muy Alto'
        };
        return formatMap[riesgo] || riesgo;
    };
    const getShadowClass = (riesgo: string) => {
        const shadowMap: { [key: string]: string } = {
            'alto': 'shadow-[inset_0_2px_15px_0_rgba(220,38,38,0.3)]',
            'medio': 'shadow-[inset_0_2px_15px_0_rgba(234,179,8,0.3)]',
            'bajo': 'shadow-[inset_0_2px_15px_0_rgba(45,212,191,0.3)]',
            'sinRiesgo': 'shadow-[inset_0_2px_15px_0_rgba(34,197,94,0.3)]',
            'muyAlto': 'shadow-[inset_0_2px_15px_0_rgba(34,197,94,0.3)]'
        };
        return shadowMap[riesgo] || '';
    };

    
      

    return (
        <div className='flex border rounded-2xl shadow-md bg-gray-50  md:w-full xl:w-full lg:w-full justify-between chart-container'>
            <Card className={`flex flex-col ${className} ${getShadowClass(getRiesgoMasComun.riesgo)} h-[450px] max-w-[450px]`}>
                <CardHeader className="items-center pb-0">
                    <CardTitle className='text-center'>{title}</CardTitle>
                    <CardDescription className='font-bold'>{formatRiesgo(getRiesgoMasComun.riesgo)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="personas"
                                nameKey="riesgo"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >   
                                                     
                                                        {((getRiesgoMasComun.personas / totalPersonas) * 100).toFixed(0)}%
          
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        {formatRiesgo(getRiesgoMasComun.riesgo)}
                                                        
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="pt-2">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
                        {chartData.map((item) => (
                            <div 
                                key={item.riesgo} 
                                className="flex items-center gap-1"
                                style={{ color: item.fill }}
                            >
                                <span className="font-medium">
                                    {formatRiesgo(item.riesgo)}
                                </span>
                                <span>
                                    {((item.personas / totalPersonas) * 100).toFixed(1)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </CardFooter>
            </Card>
            <div className='w-[60%] p-4 flex flex-col justify-center ml-4 gap-5'>
                <h3 className="text-lg font-bold mb-2 text-center">Puntaje Promedios por dimension</h3>
                <div className='mt-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
                <div className="space-y-1">
                    {dataDimensiones.map((dominio: DominioLiderazgo, index: number) => (
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
        </div>
    )
}

export default GraficoPie