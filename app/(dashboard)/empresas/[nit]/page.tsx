'use client'

import React, { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { Building2, ChevronDown, RotateCw , MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableComponent } from '@/components/tablecomponent';
import { DialogCrearEmpleados } from '@/components/empresas/dialogCrearEmpleados';
import { useToast } from "@/hooks/use-toast"
import { DialogImportarEmpleados } from '@/components/empresas/dialogImportarEmpleados';
import { DialogCrearSedes } from '@/components/empresas/dialogCrearSedes';
import SedeComponent from '@/components/empresas/sedeComponent';
import { useRouter } from 'next/navigation'
import EmpleadosDashboard from '@/components/empresas/contadorFormularios';
interface Option {
  value: string;
  label: string;
}

Amplify.configure(outputs);


const client = generateClient<Schema>();
const options = [
    { value: 'bateria', label: 'Bateria de Riesgo Psicosocial' },
    { value: 'trabajo', label: 'Puesto de Trabajo' }
  ];
function PaginaEmpresa({params}:{params:{nit:string}}) {
    const router = useRouter()
    const { toast } = useToast()
    const {nit} = params
    const [empresa, setEmpresa] = useState<Array<Schema["Empresa"]["type"]>>([]);
    const [empleados, setEmpleados] = useState<Array<Schema["Empleado"]["type"]>>([]);
    const [sedes,setSedes] = useState<Array<Schema["Sedes"]["type"]>>([]);
    const [citas,setCitas] = useState<Array<Schema["Citas"]["type"]>>([]);
    const [sedeActual, setSedeActual] = useState<string>('');

    const [isOpen, setIsOpen] = useState(false);
    const [isEmpleado, setIsEmpleado] = useState(true);
    const [isCita, setIsCita] = useState(false);
    const [isOpenCita, setIsOpenCita] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option>({ value: 'bateria', label: 'Bateria de Riesgo Psicosocial' });



    function listEmpleados() {
      client.models.Empleado.observeQuery({
        filter: {
          empresaId: {
            eq: nit
          }
        }
      }).subscribe({
        next: (data) => setEmpleados([...data.items]),
      });
    }
  
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

    function listSedes() {
      client.models.Sedes.observeQuery({
        filter: {
          empresaId: {
            eq: nit
          }
        }
      }).subscribe({
        next: (data) => setSedes([...data.items]),
      });
    
    }

    function listCitas() {
      client.models.Citas.observeQuery().subscribe({
        next: (data) => setCitas([...data.items]),
      });}
    
    
   
    useEffect(() => {
      listEmpleados();
      listEmpresa();
      listSedes();
      listCitas();
    }, []);

    const handleSelect = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    const handleEmpleado = () => {
      setIsEmpleado(true);
      setIsCita(false);

    };
    const handleEstadisticas = () => {
      router.push(`/empresas/${nit}/estadisticas`);

    };
    const handleCitas = () => {
      setIsEmpleado(false);
      setIsCita(true);
    };
  
    const crearEmpleado = (data: any) => {

      const empleadoExistente = empleados.find(
        emp => emp.numeroDocumento === data.numeroDocumento
      );
      if (empleadoExistente) {
        toast({
          title: "Error",
          description: "El empleado ya existe",
          variant: "destructive"
        });
        return;
      }
      const empleadoData1 = {
        ...data,
        empresaId: nit,
        estado: "INCOMPLETO"
      };

      client.models.Empleado.create(empleadoData1);
      toast({
          title: "¡Éxito!",
          description: "El empleado fue creado correctamente",
          className: "bg-green-500 text-white"
      });
    }
    const crearSede = (data: any) => {
      console.log(data);
      const sedeData ={
        ...data,
        empresaId: nit,
        idsedes: nit + sedes.length
      }
      client.models.Sedes.create(sedeData);
      toast({
        title: "¡Éxito!",
        description: "El empleado fue creado correctamente",
        className: "bg-green-500 text-white"
    });
    }

    const handleExcelData = async (data: any[]) => {
      // Aquí puedes manejar los datos del Excel
      console.log("Datos en el componente padre:", data);

      try {
        await Promise.all(
          data.map(empleado => 
            client.models.Empleado.create({
              ...empleado,
              empresaId: nit,
              estado: "INCOMPLETO"
            })
          )
        );
    
        toast({
          title: "Éxito",
          description: `Se crearon ${data.length} empleados correctamente`,
          className: "bg-green-500 text-white"
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Hubo un error al crear los empleados",
          variant: "destructive"
        });
      }
    };

    function verificarOTPExistente(nuevoOTPver : string) {
      return citas.some(cita => cita.otp === nuevoOTPver);
    }

    function generarOTPUnico( longitud = 6) {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let nuevoOTP;
      do {
          nuevoOTP = '';
          for (let i = 0; i < longitud; i++) {
              const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
              nuevoOTP += caracteres[indiceAleatorio];
          }
      } while (verificarOTPExistente(nuevoOTP));
  
      return nuevoOTP;
    }
    
    const handleTogglePress =  async (data:any) => {

      const citasede = citas.filter(cita => cita.sedeId == data.idsedes);
      const citaActiva = citasede.find(cita => cita.estado === "ACTIVA");
      

      try {
        if (data.checked) {
          await client.models.Citas.create({
            fecha: new Date().toISOString().split('T')[0],
            estado: "ACTIVA",
            otp: generarOTPUnico(),
            sedeId: data.idsedes,
            contadorFormularios: 0,
            contadorCitas: citasede.length,
          });
          await Promise.all(
            empleados.map(empleado => 
                client.models.Empleado.update({
                    numeroDocumento: empleado.numeroDocumento,
                    estado: "INCOMPLETO"
                })
            )
        );

        } else {
          if (!citaActiva) {
            console.error('No hay citas activas');
            return;
          }


          client.models.Citas.update({
            otp: citaActiva.otp,
            estado: "DESACTIVADA"
          });
          console.log('Cita desactivada');
        }
      } catch (error) {
        console.error('Error al crear la cita:', error);
        // Aquí deberías manejar el error apropiadamente (mostrar un mensaje al usuario, etc.)
      }
    };

    const citasPorSede = async (sede:any) => {
      const { data: citas } = await sede.citas();
      return citas;
    }
   
  return (
    <div>
      {empresa.length > 0 ? (
        <div className='w-full flex flex-col'>
            <section className='w-full justify-between flex items-center'>
                <div className='flex items-end p-2 border-b-2 border-green-200'>
                    <Building2 className='w-[40px] h-[40px] text-green-500 mr-2 self-center mt-1'/>
                    <h1 className='text-5xl text-gray-800'>{empresa[0].nombre}</h1>
                </div>
                
            </section>
            <section className='w-full flex flex-col p-4 items-center'>
                <div className='flex justify-between flex-row w-full'>
                  {/* Acciones dentro de la ventana */}
                  <div className="relative w-64">
                    {
                      isEmpleado ? (
                          <div className='flex gap-3'>
                            <DialogImportarEmpleados onDataLoad={handleExcelData} />
                          
                            <DialogCrearEmpleados onFormSubmit={crearEmpleado}/>
                          </div>
                      ) : isCita ? (
                        <div className='flex gap-3'>
                            <DialogCrearSedes onFormSubmit={crearSede}/>
                        </div>
                      ):
                      (
                        <button
                          type="button"
                          onClick={() => setIsOpen(!isOpen)}
                          className="w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 flex justify-between items-center"
                      >
                          <span className={`block truncate ${!selectedOption ? 'text-gray-500' : 'text-gray-900'}`}>
                          {selectedOption ? selectedOption.label : "selecciona una opcion"}
                          </span>
                          <ChevronDown 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                              isOpen ? 'transform rotate-180' : ''
                          }`}
                          />
                      </button>
                      
                      )
                    
                    }
                      
                    {isOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                        {options.map((option) => (
                            <div
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors"
                            >
                            {option.label}
                            </div>
                        ))}
                        </div>
                    )}
                  </div>
                  {/*  controladores de navegacion */}
                  <div className='flex gap-3'>
                    <Button className='bg-white text-black border hover:text-white hover:bg-green-500' onClick={() => handleEstadisticas()} >
                      Estadísticas
                    </Button>
                     { isEmpleado ? (
                          null
                      ):(<Button className='bg-white text-black border hover:text-white hover:bg-green-500' onClick={() => handleEmpleado()} >
                      Empleados
                    </Button>)}
                    
                    <Button className='bg-white text-black border hover:text-white hover:bg-green-500' onClick={() => handleCitas()}>
                          Citas
                    </Button>
                  

                    

                    
                  </div>
                </div>

                {isEmpleado ? (
                  empleados.length > 0 ? (
                      <div className='w-full mt-4'> 
                  
                        <TableComponent chartData={empleados} />
            
                      </div>):
                      (
                        <div className='w-full h-[600px] flex items-center justify-center'>No hay empleados aún</div>
                      )
                  ): isCita ? (
                    sedes.length > 0 ? (
                      <div className='w-full flex mt-4 gap-4 justify-between'> 
                        <div className='flex flex-wrap gap-4 h-full'>

                        
                        {sedes.map((sede) => {
                            const citasSede = citas.filter(cita => cita.sedeId === sede.idsedes);
                            
                            const citaMaxContador = citasSede.length > 0 
                                ? citasSede.reduce((max, cita) => 
                                    // Verificamos que tanto max como cita tengan contadorCitas
                                    (cita?.contadorCitas ?? 0) > (max?.contadorCitas ?? 0) ? cita : max,
                                    citasSede[0]
                                  )
                                : null;

                            if (citaMaxContador) {
                              
                                return (
                                    <SedeComponent 
                                        key={sede.idsedes} 
                                        onTogglePress={handleTogglePress}
                                        data={sede}
                                        cita={citaMaxContador}
                                        
                                    />
                                );
                            }

                            return (
                                <SedeComponent 
                                    key={sede.idsedes} 
                                    onTogglePress={handleTogglePress}
                                    data={sede}
                                />
                            );
                        })}
                        </div>
                        <div>
                          <EmpleadosDashboard empleados={empleados}/>
                        </div>
                        
                      
                        

                      </div>
                    ) : (
                      <div className='w-full h-[600px] flex items-center justify-center'>No hay sedes aún</div>
                    )
    
                  ): (selectedOption.value === 'bateria') ? (
                    sedes.length > 0 ? (
                     <>
                      {sedes.map( sede => (
                        <div>
                          hola si ves esto es un error
                        </div>
                      ))}
                      </>
                    ) : (
                      <div className='w-full h-[600px] flex items-center justify-center'>No hay sedes aún</div>
                    )
                   
                  ) : (
                    <div className="text-gray-600">
                      {selectedOption ? selectedOption.label : "Selecciona una opción"}
                    </div>
                  )}
               
            </section>   
        </div>
      ) : (
        <div className='text-2xl w-full h-[600px] flex items-center justify-center'>Loading</div>
      )}
    </div>
  )
}

export default PaginaEmpresa