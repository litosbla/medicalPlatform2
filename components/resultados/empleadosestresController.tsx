import React, { useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';

interface FormularioControllerProps {
  onTipoFormularioChange: (value: boolean) => void;
  isLoading?: boolean;
}

export default function EstresEmpleadosController({ 
  onTipoFormularioChange,
  isLoading = false

}: FormularioControllerProps) {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
    onTipoFormularioChange(!isActive);
  };
  return (
    <div className="relative max-w-[250px]">
      <button
        onClick={handleClick}
        className="w-full p-3 bg-white border rounded-lg shadow-sm 
                 hover:border-green-400 transition-all flex items-center justify-between
                 focus:outline-none focus:ring-2 focus:ring-green-500/50
                 h-[50px]"
        disabled={isLoading}
      >
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 whitespace-nowrap overflow-hidden">
              {isActive ? 'Ver gráficas generales' : 'Ver personal con estrés'}
          </span>
        </div>
        
      </button>

    </div>
  );
}