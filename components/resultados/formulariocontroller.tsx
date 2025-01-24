import React, { useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';

interface FormularioControllerProps {
  onTipoFormularioChange: (value: string) => void;
  isLoading?: boolean;
}

export default function FormularioController({ 
  onTipoFormularioChange,
  isLoading = false
}: FormularioControllerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState('');

  const surveyTypes = [
    { value: "personal", label: "Personales" },
    { value: "intralaboral-a", label: "Intralaboral A" },
    { value: "intralaboral-b", label: "Intralaboral B" },
    { value: "extralaboral", label: "Extralaboral" },
    { value: "stress", label: "Estrés" }
  ];

  const handleFormSelect = (value: string, label: string) => {
    setSelectedForm(label);
    onTipoFormularioChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative max-w-[250px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-white border rounded-lg shadow-sm 
                 hover:border-green-400 transition-all flex items-center justify-between
                 focus:outline-none focus:ring-2 focus:ring-green-500/50
                 h-[50px]"
        disabled={isLoading}
      >
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 whitespace-nowrap overflow-hidden w-[100px]">
            {selectedForm || 'Filtrar'}
          </span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 
                    ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && !isLoading && (
        <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
          <div className="max-h-64 overflow-y-auto">
            {surveyTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleFormSelect(type.value, type.label)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 
                         transition-colors flex items-center gap-3
                         text-gray-700 first:rounded-t-lg last:rounded-b-lg"
              >
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-10 p-4">
          <div className="text-center text-gray-500">
            Cargando formularios...
          </div>
        </div>
      )}
    </div>
  );
}