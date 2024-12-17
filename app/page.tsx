"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
 

  return (
    <main>
      <h1>My todos</h1>
      <ul>
        <li>Todo 1</li>
        <li>Todo 2</li>
      </ul>
    </main>
  );
}