import Dashboardresultados from '@/components/resultados/dashboardresultados'
import Header from '@/components/resultados/header'
import React from 'react'

export default function EstadisticasPage({params}:{params:{nit:string}}) {
  const {nit} = params
  return (
    <div className='w-full flex flex-col'>
      <Header nit={nit}/>
      <Dashboardresultados nit={nit}/>
    </div>

  )
}

