import React from 'react'

interface FormularioControllerProps {
  onTipoFormularioChange: (value: string) => void;
  isLoading?: boolean;
}

export default function FormularioController({ 
  onTipoFormularioChange,
  isLoading = false
}: FormularioControllerProps) {
  const surveyTypes = [
    { value: "personal", label: "Personales" },
    { value: "intralaboral-a", label: "Intralaboral A" },
    { value: "intralaboral-b", label: "Intralaboral B" },
    { value: "extralaboral", label: "Extralaboral" },
    { value: "stress", label: "Estrés" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTipoFormularioChange(e.target.value);
  };

  return (
    <div className="p-4">
      {!isLoading ? (
        <select
          onChange={handleChange}
          className="w-full p-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-black"
          defaultValue=""
        >
          <option value="" disabled>Selecciona un tipo de encuesta</option>
          {surveyTypes.map((type) => (
            <option
              key={type.value}
              value={type.value}
            >
              {type.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="text-gray-500">loading</div>
      )}
    </div>
  )
}