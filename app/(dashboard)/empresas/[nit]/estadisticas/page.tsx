"use client";
import SedeController from '@/components/resultados/dashboardresultados'
import CitaController from '@/components/resultados/citacontroller'
import Header from '@/components/resultados/header'
import React, { useState } from 'react'
import DashbboardPrincipalA from '@/components/resultados/dashboardkpis'
import FormularioController from '@/components/resultados/formulariocontroller'
import DashboardPrincipalB from '@/components/resultados/dashboardkpisb';
import DashboardPrincipalPer from '@/components/resultados/dashboardkpisper';
import DashboardPrincipalExtra from '@/components/resultados/dashboardkpisextra';
import DashboardPrincipalEstres from '@/components/resultados/dashboardkpisestres';

export default function EstadisticasPage({params}:{params:{nit:string}}) {
  const {nit} = params
  const [sedeIdactual, setSedeIdactual] = useState<string | null>(null)
  const [citaIdactual, setCitaIdactual] = useState<string | null>(null)
  const [formActual, setFormActual] = useState<string | null>(null)
  const handlechangeSede = (sedeId:any) => {
    console.log(sedeId)
    setSedeIdactual(sedeId)
  }
  const handlechangeCita = (citaId:any) => {
    console.log(citaId)
    setCitaIdactual(citaId)
  }
  const handlechangeForm = (data:any) => {
    console.log(data)
    setFormActual(data)
  }

  return (
    <div className='w-full flex flex-col'>
      <Header nit={nit} />
      <div className="flex w-full mt-4 gap-4">

        <SedeController nit={nit} onchanging={handlechangeSede}/>
        {
          sedeIdactual ? (
            
              <CitaController onchanging={handlechangeCita} sedeAtual={sedeIdactual} />
          
          ) : (
            <div>
              <h1>{sedeIdactual}</h1>
            </div>)
        }
        {
          citaIdactual ? (
               <FormularioController onTipoFormularioChange={handlechangeForm}/>
            ) : (
          <div>
           
          </div> )
      }
      </div>
      {
        citaIdactual ? (
          <div className="flex w-full">
             {formActual === "personal" ? (
                <DashboardPrincipalPer citaActual={citaIdactual} />
              ) : formActual === "intralaboral-a" ? (
                <DashbboardPrincipalA citaActual={citaIdactual}/>
              ) : formActual === "intralaboral-b" ? (
                <DashboardPrincipalB citaActual={citaIdactual} />
              ) : formActual === "extralaboral" ? (
                <DashboardPrincipalExtra citaActual={citaIdactual} />
              ) : formActual === "stress" ? (
                <DashboardPrincipalEstres citaActual={citaIdactual} />
              ) : (
                <div className='w-full h-[400px] justify-center flex items-center'>
        <h1 className='text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text drop-shadow-md'>
          Selecciona un formulario
        </h1>
      </div>
          )}
          </div>
        ) : (
      <div className='w-full h-[400px] justify-center flex items-center'>
        <h1 className='text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text drop-shadow-md'>
          Selecciona una Sede y una cita 
        </h1>
      </div>)
      }


      {/* <DashboardKpis sedeId={sedeIdactual} /> */}
    </div>
  )
}

