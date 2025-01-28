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

// Tipos base para los datos
type ChartItem = {
    id: string;
    value: number;
    fill: string;
}

// Tipo para la configuración de categorías
type CategoryConfig = {
    id: string;
    label: string;
    color: string;
}

// Props del componente
type FlexiblePieChartProps = {
    title: string;
    description?: string;
    data: ChartItem[];
    categories: CategoryConfig[];
    className?: string;
    explication?: boolean;
}

function FlexiblePieChart({
    title,
    description = "Distribución",
    data,
    categories,
    className,
    explication = false
}: FlexiblePieChartProps) {
    // Calcular el total
    const total = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.value, 0)
    }, [data])

    const getMostCommon = React.useMemo(() => {
        return data.reduce((max, current) => 
            current.value > max.value ? current : max
        , data[0]);
    }, [data]);

    const getCategoryLabel = (id: string) => {
        const category = categories.find(cat => cat.id === id);
        return category?.label || id;
    };

    const getShadowClass = (id: string) => {
        const category = categories.find(cat => cat.id === id);
        if (!category) return '';
        return `shadow-[inset_0_2px_15px_0_${category.color.replace('hsl', 'hsla').replace(')', ',0.3)')}]`;
    };

    const chartConfig = React.useMemo(() => {
        const config: Record<string, { label: string; color?: string }> = {
            value: { label: "Cantidad" }
        };
        
        categories.forEach(category => {
            config[category.id] = {
                label: category.label,
                color: category.color
            };
        });
        
        return config;
    }, [categories]) satisfies ChartConfig;


    return (
        <Card className={`flex flex-col ${className} w-[441px]  h-[450px] max-w-[450px] chart-container`}>
                <CardHeader className="items-center pb-0">
                    <CardTitle className='text-center'>{title}</CardTitle>
                    <CardDescription className='font-bold'>
                        {/* {getCategoryLabel(getMostCommon.id)} */}
                        {getMostCommon && getCategoryLabel(getMostCommon.id)}
                    </CardDescription>
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
                                data={data}
                                dataKey="value"
                                nameKey="id"
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
                                                        {getMostCommon ? ((getMostCommon.value / total) * 100).toFixed(0) : 0}%
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        {getMostCommon ? getCategoryLabel(getMostCommon.id) : ''}
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
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs w-full">
                        {data.map((item) => (
                            <div 
                                key={item.id} 
                                className="flex items-center gap-2 text-black contenedor"
                            >
                                <div 
                                    className="w-3 h-3 rounded-sm"
                                    style={{ backgroundColor: item.fill }}
                                />
                                <span className="font-medium riesgo">
                                    {getCategoryLabel(item.id)}
                                </span>
                                <span className='porcentaje'>
                                    {((item.value / total) * 100).toFixed(1)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </CardFooter>
            </Card>
    
    )
}

export default FlexiblePieChart