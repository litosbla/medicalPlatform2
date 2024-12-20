import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"


export default function ScrollAreaComponent({datos}: any) {
  const datosOrdenados = [...datos].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  return (
    <ScrollArea className="h-[225px] w-48 rounded-xl border ">
      <div className="pt-4 pr-4 pl-4">
        <h4 className="mb-4 text-sm font-medium leading-none text-black">Citas</h4>
        {datosOrdenados.map((datocita : any) => (
          <div key={datocita.otp}>
            <div  className="text-sm">
              <p className="text-sm text-gray-500">{datocita.estado}</p>
              <p className="text-sm text-gray-500">{datocita.fecha}</p>
            </div>
            <Separator className="my-2" />
          </div>
        ))} 
      </div>
    </ScrollArea>
  )
}
