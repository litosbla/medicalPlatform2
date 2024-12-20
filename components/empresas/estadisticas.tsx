'use client'

import React, { useEffect, useState } from 'react'

import ScrollAreaComponent from '@/components/scrollAreaComponent';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"


interface EstadisticasProps {
    citas: any;
    sedes: any;
    controladorSedes: (data: any) => void; // Ahora es obligatorio
    
  }
  
export default function Estadisticas({citas, sedes, controladorSedes }: EstadisticasProps) {
    useEffect(() => {
        console.log('citas', citas);
        console.log('sedes', sedes);

    }, []);
    
     const [api, setApi] = useState<CarouselApi>()
     const [current, setCurrent] = useState(0)
     const [count, setCount] = useState(0)
     const [currentCita, setCurrentCita] = useState<any[]>([]);
   
     useEffect(() => {
      
       if (!api) {
        console.log("hola pasa por aca y no hay api")
        const sedeActual = sedes[0];
        controladorSedes(sedeActual.idsedes);
      
        
        const citasFiltradas = citas.filter((cita: any) => cita.sedeId === sedeActual.idsedes);
        const citaActiva = citasFiltradas.find((cita: any) => cita.estado === 'ACTIVA');
        
        // Filtrar las citas excluyendo la activa
        const citasNoActivas = citasFiltradas.filter((cita: any) => cita.estado !== 'ACTIVA');
   
        setCurrentCita(citasFiltradas);
       
         return
       }
   
       setCount(api.scrollSnapList().length)
       setCurrent(api.selectedScrollSnap() + 1)
   
       api.on("select", () => {
        const currentIndex = api.selectedScrollSnap(); // 0-based index
        setCurrent(currentIndex + 1); // Para mostrar 1-based en la UI
        
        const sedeActual = sedes[currentIndex];
        controladorSedes(sedeActual.idsedes);

        const citasFiltradas = citas.filter((cita: any) => cita.sedeId === sedeActual.idsedes);
        const citaActiva = citasFiltradas.find((cita: any) => cita.estado === 'ACTIVA');
        
        // Filtrar las citas excluyendo la activa
        const citasNoActivas = citasFiltradas.filter((cita: any) => cita.estado !== 'ACTIVA');

        setCurrentCita(citasFiltradas);

        // setCurrentCita(citas[])
       })
     }, [api])


    
  return (

        <div className="flex justify-between items-center flex-wrap gap-4 w-1/2">
            {/* carousel */}
            <div className="mx-auto flex w-full flex-wrap justify-between ">
                  <Carousel setApi={setApi} className="w-full max-w-[225px] max-h-[225px]">
                    <CarouselContent>
                      {sedes.map((sededata :any , index : any) => (
                        <CarouselItem key={index}>
                          <Card>
                            <CardContent className="flex gap-4 aspect-square items-center justify-center p-6 relative">
                                <span className="text-xl font-semibold bg-green-500 text-white w-6 h-6 flex justify-center items-center rounded-full">{index + 1}</span>
                               <span className="text-xl font-semibold text-wrap">{sededata.nombre}</span>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
            
                  </Carousel>
                  <div className="ml-20 flex-grow text-center text-sm text-muted-foreground ">
                      <ScrollAreaComponent datos={currentCita}/>
                    
                  </div>
            </div>
           
            {/* <ScrollAreaComponent/> */}
        </div>
        
  )
}

