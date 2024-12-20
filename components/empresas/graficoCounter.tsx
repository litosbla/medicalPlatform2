'use client'
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);
const client = generateClient<Schema>();
export default function GraficoCounter({formularioIntralaboralA}: any) {
  
  return (
    <div className="w-[50%] bg-black rounded-xl">
        <ul>
        {formularioIntralaboralA.map((respuesta : any) => (
          <li key={respuesta.formularioId}>{respuesta.nivelRiesgoTotal}</li>
        ))}
      </ul>
    </div>
  )
}

