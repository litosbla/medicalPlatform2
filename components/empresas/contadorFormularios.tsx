import React, { useMemo } from 'react';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

type Empleado = {
  tipoDocumento: any;
  numeroDocumento: any;
  nombre: any;
  email: any;
  tipoForm: any;
  empresaId: any;
  estado: any;
  [key: string]: any;
};

type EstadisticaItem = {
  estado: string;
  cantidad: number;
  porcentaje: number;
};

// Función para obtener el valor real de una propiedad
const obtenerValorPropiedad = (obj: any, propiedad: string): any => {
  // Si el objeto es null o undefined, retornamos undefined
  if (!obj) return undefined;

  // Si la propiedad existe directamente en el objeto
  if (obj[propiedad] !== undefined) {
    // Si es una función (getter), la ejecutamos
    if (typeof obj[propiedad] === 'function') {
      return obj[propiedad]();
    }
    // Si es un valor primitivo o un objeto normal, lo retornamos
    return obj[propiedad];
  }

  // Si hay un getter específico para la propiedad
  const getterName = `get${propiedad.charAt(0).toUpperCase()}${propiedad.slice(1)}`;
  if (typeof obj[getterName] === 'function') {
    return obj[getterName]();
  }

  // Si hay una propiedad _estado (común en algunos ORMs)
  if (obj['_' + propiedad] !== undefined) {
    return obj['_' + propiedad];
  }

  return undefined;
};

// Función para limpiar los datos del empleado
const limpiarDatosEmpleado = (empleado: any): Empleado => {
  // Intentamos obtener cada propiedad usando la función helper
  const datosLimpios = {
    tipoDocumento: obtenerValorPropiedad(empleado, 'tipoDocumento'),
    numeroDocumento: obtenerValorPropiedad(empleado, 'numeroDocumento'),
    nombre: obtenerValorPropiedad(empleado, 'nombre'),
    email: obtenerValorPropiedad(empleado, 'email'),
    tipoForm: obtenerValorPropiedad(empleado, 'tipoForm'),
    empresaId: obtenerValorPropiedad(empleado, 'empresaId'),
    estado: obtenerValorPropiedad(empleado, 'estado')
  };

  // Para debug, mostramos en consola los datos originales y limpios
  console.log('Datos originales:', empleado);
  console.log('Datos limpios:', datosLimpios);

  return datosLimpios;
};

const EmpleadosDashboard = ({ empleados: empleadosCrudos }: { empleados: any[] }) => {

    
  // Limpiar datos de empleados
  const empleados = useMemo(() => {
    console.log('Empleados crudos:', empleadosCrudos);
    return empleadosCrudos.map(emp => limpiarDatosEmpleado(emp));
  }, [empleadosCrudos]);

  // Configuración de colores por estado
  const estadoColors: { [key: string]: string } = {
    COMPLETADO: '#4CAF50',
    PROCESO: '#FFC107',
    INCOMPLETO: '#F44336'
  };

  // Calcular estadísticas por estado
  const estadisticas = useMemo(() => {
    const stats = empleados.reduce((acc: { [key: string]: number }, emp) => {
      const estado = obtenerValorPropiedad(emp, 'estado') || 'DESCONOCIDO';
      acc[estado] = (acc[estado] || 0) + 1;
      return acc;
    }, {});

    const total = empleados.length;
    return Object.entries(stats).map(([estado, cantidad]): EstadisticaItem => ({
      estado,
      cantidad: Number(cantidad),
      porcentaje: Math.round((Number(cantidad) / total) * 100)
    }));
  }, [empleados]);

  // Ordenar empleados por estado
  const empleadosOrdenados = useMemo(() => {
    const orden: { [key: string]: number } = {
      COMPLETADO: 1,
      PROCESO: 2,
      INCOMPLETO: 3
    };

    return [...empleados].sort((a, b) => {

      const estadoA = obtenerValorPropiedad(a, 'estado') || 'DESCONOCIDO';
      const estadoB = obtenerValorPropiedad(b, 'estado') || 'DESCONOCIDO';
      return (orden[estadoA] || 999) - (orden[estadoB] || 999);
    });
  }, [empleados]);

  // Función para exportar a Excel con datos limpios
  const exportarExcel = () => {
    const datosParaExcel = empleados.map(emp => ({
      'Tipo Documento': obtenerValorPropiedad(emp, 'tipoDocumento'),
      'Número Documento': obtenerValorPropiedad(emp, 'numeroDocumento'),
      'Nombre': obtenerValorPropiedad(emp, 'nombre'),
      'Email': obtenerValorPropiedad(emp, 'email'),
      'Tipo Form': obtenerValorPropiedad(emp, 'tipoForm'),
      'Estado': obtenerValorPropiedad(emp, 'estado')
    }));

    const ws = XLSX.utils.json_to_sheet(datosParaExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Empleados');
    XLSX.writeFile(wb, 'empleados.xlsx');
  };

  return (
    <div className="space-y-6 max-w-[400px]">
      {/* Estadísticas */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">EMPLEADOS TOTALES</h2>
        <div className="space-y-4">
          {estadisticas.map(({ estado, cantidad, porcentaje }) => (
            <div key={estado} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{estado}</span>
                <span>{cantidad} empleados ({porcentaje}%)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${porcentaje}%`,
                    backgroundColor: estadoColors[estado] || '#gray-500'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Empleados */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Lista de Empleados</h2>
          <button
            onClick={exportarExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
          >
            <Download size={20} />
            Exportar Excel
          </button>
        </div>
        <div className="divide-y">
          {empleadosOrdenados.map((empleado) => (
            <div
              key={obtenerValorPropiedad(empleado, 'numeroDocumento') || Math.random()}
              className="p-4 flex items-center gap-4 hover:bg-gray-50"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: estadoColors[obtenerValorPropiedad(empleado, 'estado')] || '#gray-500'
                }}
              />
              <div>
                <div className="font-medium">
                  {obtenerValorPropiedad(empleado, 'nombre') || 'Sin nombre'}
                </div>
                <div className="text-sm text-gray-600">
                  {obtenerValorPropiedad(empleado, 'tipoDocumento') || 'N/A'}: {obtenerValorPropiedad(empleado, 'numeroDocumento') || 'N/A'}
                </div>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                {obtenerValorPropiedad(empleado, 'estado') || 'DESCONOCIDO'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmpleadosDashboard;