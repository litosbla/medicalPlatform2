"use client";
import SedeController from '@/components/resultados/dashboardresultados'
import CitaController from '@/components/resultados/citacontroller'
import Header from '@/components/resultados/header'
import { Document, Packer, Paragraph } from 'docx';
import React, { useState } from 'react'
import DashbboardPrincipalA from '@/components/resultados/dashboardkpis'
import FormularioController from '@/components/resultados/formulariocontroller'
import DashboardPrincipalB from '@/components/resultados/dashboardkpisb';
import DashboardPrincipalPer from '@/components/resultados/dashboardkpisper';
import DashboardPrincipalExtra from '@/components/resultados/dashboardkpisextra';
import DashboardPrincipalEstres from '@/components/resultados/dashboardkpisestres';
import EstresEmpleadosController from '@/components/resultados/empleadosestresController';

export default function EstadisticasPage({params}:{params:{nit:string}}) {
  const {nit} = params
  const [sedeIdactual, setSedeIdactual] = useState<string | null>(null)
  const [citaIdactual, setCitaIdactual] = useState<string | null>(null)
  const [formActual, setFormActual] = useState<string | null>(null)
  const [estresOpen, setEstresOpen] = useState<boolean>(false)
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
      <div className="flex w-full mt-4 gap-4 justify-center">

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
          estresOpen ? 
          (<div>

          </div>) : 
          ( <div className="flex w-full flex-col ">
          
            <DashbboardPrincipalA citaActual={citaIdactual} empresanit={nit}/>
          </div>
          )
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

