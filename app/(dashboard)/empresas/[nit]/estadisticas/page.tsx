"use client";
import SedeController from '@/components/resultados/dashboardresultados'
import CitaController from '@/components/resultados/citacontroller'
import Header from '@/components/resultados/header'
import React, { useState } from 'react'
import DashbboardPrincipal from '@/components/resultados/dashboardkpis'

export default function EstadisticasPage({params}:{params:{nit:string}}) {
  const {nit} = params
  const [sedeIdactual, setSedeIdactual] = useState<string | null>(null)
  const [citaIdactual, setCitaIdactual] = useState<string | null>(null)

  const handlechangeSede = (sedeId:any) => {
    console.log(sedeId)
    setSedeIdactual(sedeId)
  }
  const handlechangeCita = (citaId:any) => {
    console.log(citaId)
    setCitaIdactual(citaId)
  }

  return (
    <div className='w-full flex flex-col'>
      <Header nit={nit} />
      <SedeController nit={nit} onchanging={handlechangeSede}/>
      {
        sedeIdactual ? (
          <div>
            <CitaController onchanging={handlechangeCita} sedeAtual={sedeIdactual} />
            
          </div>
        ) : (
          <div>
            <h1>{sedeIdactual}</h1>
          </div>)
      }
      {
        citaIdactual ? (
          <div className="flex w-full">
            <DashbboardPrincipal citaActual={citaIdactual}/>
          </div>
        ) : (
          <div>
            <h1>{citaIdactual}</h1>
          </div> )
      }

      {/* <DashboardKpis sedeId={sedeIdactual} /> */}
    </div>
  )
}

