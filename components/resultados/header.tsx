'use client';

import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import React, { useEffect, useState } from 'react'
import { Building2 } from "lucide-react";

Amplify.configure(outputs);


const client = generateClient<Schema>();
function Header(
    {nit}:{nit:string}
) {
    const [empresa, setEmpresa] = useState<Array<Schema["Empresa"]["type"]>>([]);
    function listEmpresa() {
        client.models.Empresa.observeQuery({
            filter: {
              nit: {
                eq: nit
              }
            }
          }).subscribe({
            next: (data) => setEmpresa([...data.items]),
          });
    }

    useEffect(() => {
        listEmpresa();
    }
    , []);
  return (

    <section className='w-full justify-between flex items-center'>
      {empresa.length > 0 ? (
        <div className='flex items-end p-2 border-b-2 border-green-200'>
            <Building2 className='w-[40px] h-[40px] text-green-500 mr-2 self-center mt-1'/>
            <h1 className='text-5xl text-gray-800'>{empresa[0].nombre}</h1>
        </div>) : (
          <div>no hay empresaas</div>
        )
      }
    </section>
        
  )
}

export default Header