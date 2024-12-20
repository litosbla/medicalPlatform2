
'use client'

import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import React, { useEffect, useState } from 'react'
import { Building2 } from "lucide-react";

Amplify.configure(outputs);


const client = generateClient<Schema>();
export default function Dashboardresultados({nit}:{nit:string}) {
    const [currentIntraA,setCurrentIntraA] = useState<Array<Schema["FormularioIntralaboralA"]["type"]>>([]);
    const [currentIntrB,setCurrentIntraB] = useState<Array<Schema["FormularioIntralaboralB"]["type"]>>([]);
    const [currentExtralaboral,setCurrentExtralaboral] = useState<Array<Schema["FormularioExtralaboral"]["type"]>>([]);
    const [currentEstres,setCurrentEstres] = useState<Array<Schema["FormularioEstres"]["type"]>>([]);
    const [sedes,setSedes] = useState<Array<Schema["Sedes"]["type"]>>([]);
    const [citas,setCitas] = useState<Array<Schema["Citas"]["type"]>>([]);
    const prevSedesRef = React.useRef<Array<Schema["Sedes"]["type"]>>([]);
    function listSedes() {
          client.models.Sedes.observeQuery({
            filter: {
              empresaId: {
                eq: nit
              }
            }
          }).subscribe({
            next: (data) => {
              // Solo actualiza si los datos son diferentes
              const newSedes = [...data.items];
              if (JSON.stringify(prevSedesRef.current) !== JSON.stringify(newSedes)) {
                console.log("Se actualizaron las sedes");
                prevSedesRef.current = newSedes;
                setSedes(newSedes);
              }
            },
          });
        
        }
    
        function listCitas() {
          client.models.Citas.observeQuery().subscribe({
            next: (data) => setCitas([...data.items]),
          });}
        
          function listCurrentIntraA() {
            client.models.FormularioIntralaboralA.observeQuery({
            }).subscribe({
              next: (data) => setCurrentIntraA([...data.items]),
            });
        }
        function listCurrentIntraB() {
            client.models.FormularioIntralaboralB.observeQuery({
            }).subscribe({
              next: (data) => setCurrentIntraB([...data.items]),
            });
        }
        function listCurrentExtra() {
            client.models.FormularioExtralaboral.observeQuery({
            }).subscribe({
              next: (data) => setCurrentExtralaboral([...data.items]),
            });
        }
        function listCurrentEstres() {
          client.models.FormularioEstres.observeQuery({
          }).subscribe({
            next: (data) => setCurrentEstres([...data.items]),
          });
        }
       
        useEffect(() => {
          listSedes();
          listCitas();
          listCurrentIntraA();
          listCurrentIntraB();
          listCurrentExtra();
          listCurrentEstres();
        }, []);
    
  return (
    <div>
        {sedes.length > 0 ? (
            <>
            {sedes.map((sede) => {
            console.log("se renderiza")
            
            return(
                <div key={sede.idsedes}>
                    <h1>{sede.nombre}</h1>
                    <h1>{sede.direccion}</h1>
                    <div className="flex flex-wrap">
                        
                    </div>
                </div>
                );
            
            })
           
        }
         </>) : (<div>no hay sedes</div>)}

    </div>

  )
}
