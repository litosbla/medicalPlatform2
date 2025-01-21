// types/categoryTypes.ts

export interface Category {
    id: string;
    label: string;
    color: string;
  }
  
  export interface CategoryData {
    id: string;
    value: number;
    fill: string;
  }
  
  export const genderCategories: Category[] = [
    { id: 'Masculino', label: 'Masculino', color: 'hsl(210 70% 50%)' },
    { id: 'Femenino', label: 'Femenino', color: 'hsl(340 70% 50%)' }
  ];
  
  export const maritalStatusCategories: Category[] = [
    { id: 'Soltero', label: 'Soltero', color: 'hsl(200 70% 50%)' },
    { id: 'Casado', label: 'Casado', color: 'hsl(150 70% 50%)' },
    { id: 'Ul', label: 'Unión Libre', color: 'hsl(100 70% 50%)' },
    { id: 'Separado', label: 'Separado', color: 'hsl(50 70% 50%)' },
    { id: 'Divorciado', label: 'Divorciado', color: 'hsl(25 70% 50%)' },
    { id: 'Viudo', label: 'Viudo', color: 'hsl(0 70% 50%)' },
    { id: 'Credo', label: 'Credo', color: 'hsl(270 70% 50%)' }
  ];
  
  export const educationCategories: Category[] = [
    { id: 'Ninguno', label: 'Ninguno', color: 'hsl(0 70% 50%)' },
    { id: 'Primaria_incompleta', label: 'Primaria Incompleta', color: 'hsl(30 70% 50%)' },
    { id: 'Primaria_completa', label: 'Primaria Completa', color: 'hsl(60 70% 50%)' },
    { id: 'Bachillerato_incompleto', label: 'Bachillerato Incompleto', color: 'hsl(90 70% 50%)' },
    { id: 'Bachillerato_completo', label: 'Bachillerato Completo', color: 'hsl(120 70% 50%)' },
    { id: 'Tecnico_tecnologico_incompleto', label: 'Técnico/Tecnológico Incompleto', color: 'hsl(150 70% 50%)' },
    { id: 'Tecnico_tecnologico_completo', label: 'Técnico/Tecnológico Completo', color: 'hsl(180 70% 50%)' },
    { id: 'Profesional_incompleto', label: 'Profesional Incompleto', color: 'hsl(210 70% 50%)' },
    { id: 'Profesional_completo', label: 'Profesional Completo', color: 'hsl(240 70% 50%)' },
    { id: 'Carrera_militar_policia', label: 'Carrera Militar/Policía', color: 'hsl(270 70% 50%)' },
    { id: 'Post_grado_incompleto', label: 'Postgrado Incompleto', color: 'hsl(300 70% 50%)' },
    { id: 'Post_grado_completo', label: 'Postgrado Completo', color: 'hsl(330 70% 50%)' }
  ];
  
  export const stratumCategories: Category[] = [
    { id: 'ESTRATO_1', label: 'Estrato 1', color: 'hsl(0 70% 50%)' },
    { id: 'ESTRATO_2', label: 'Estrato 2', color: 'hsl(60 70% 50%)' },
    { id: 'ESTRATO_3', label: 'Estrato 3', color: 'hsl(120 70% 50%)' },
    { id: 'ESTRATO_4', label: 'Estrato 4', color: 'hsl(180 70% 50%)' },
    { id: 'ESTRATO_5', label: 'Estrato 5', color: 'hsl(240 70% 50%)' },
    { id: 'ESTRATO_6', label: 'Estrato 6', color: 'hsl(300 70% 50%)' },
    { id: 'FINCA', label: 'Finca', color: 'hsl(30 70% 50%)' },
    { id: 'NO_SE', label: 'No Sabe', color: 'hsl(0 0% 60%)' }
  ];
  
  export const housingCategories: Category[] = [
    { id: 'Propia', label: 'Propia', color: 'hsl(120 70% 50%)' },
    { id: 'Arriendo', label: 'Arriendo', color: 'hsl(200 70% 50%)' },
    { id: 'Familiar', label: 'Familiar', color: 'hsl(280 70% 50%)' }
  ];
  
  export const positionTypeCategories: Category[] = [
    { id: 'Jefatura', label: 'Jefatura', color: 'hsl(0 70% 50%)' },
    { id: 'ProfesionalAnalistaTecnicoTecnologo', label: 'Profesional/Analista/Técnico', color: 'hsl(120 70% 50%)' },
    { id: 'AuxiliarAsistente', label: 'Auxiliar/Asistente', color: 'hsl(200 70% 50%)' },
    { id: 'OperarioServiciosGenerales', label: 'Operario/Servicios Generales', color: 'hsl(280 70% 50%)' }
  ];
  
  export const contractTypeCategories: Category[] = [
    { id: 'Temporalless1', label: 'Temporal < 1 año', color: 'hsl(0 70% 50%)' },
    { id: 'Temporalmore1', label: 'Temporal > 1 año', color: 'hsl(60 70% 50%)' },
    { id: 'Tindefinido', label: 'Término Indefinido', color: 'hsl(120 70% 50%)' },
    { id: 'Cooperado', label: 'Cooperado', color: 'hsl(180 70% 50%)' },
    { id: 'Ops', label: 'OPS', color: 'hsl(240 70% 50%)' },
    { id: 'Nose', label: 'No Sabe', color: 'hsl(0 0% 60%)' }
  ];
  
  export const salaryTypeCategories: Category[] = [
    { id: 'Fijo', label: 'Fijo', color: 'hsl(120 70% 50%)' },
    { id: 'Mixto', label: 'Mixto', color: 'hsl(200 70% 50%)' },
    { id: 'Variable', label: 'Variable', color: 'hsl(0 70% 50%)' }
  ];
  
  export const categoryConfigs = {
    sexo: genderCategories,
    estadoCivil: maritalStatusCategories,
    nivelEstudios: educationCategories,
    estrato: stratumCategories,
    tipoVivienda: housingCategories,
    tipoCargo: positionTypeCategories,
    tipoContrato: contractTypeCategories,
    tipoSalario: salaryTypeCategories
  } as const;
  
  // Helper function to transform form data
  export const transformFormData = (data: any[], category: keyof typeof categoryConfigs): CategoryData[] => {
    const counts: { [key: string]: number } = {};
    const categoryConfig = categoryConfigs[category];
    
    data.forEach(item => {
      const value = item[category];
      counts[value] = (counts[value] || 0) + 1;
    });
    
    return Object.entries(counts).map(([id, value]) => ({
      id,
      value,
      fill: categoryConfig.find(cat => cat.id === id)?.color || 'hsl(0 0% 60%)'
    }));
  };