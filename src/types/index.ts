export type UserType = 'natural' | 'juridica';

export type UserRole = 'admin' | 'vendedor' | 'odontologo' | 'recepcionista' | 'cliente';

export interface PersonaNatural {
  id?: string;
  tipoDocumento: 'cedula' | 'pasaporte';
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  genero: 'masculino' | 'femenino' | 'otro';
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  profesion: string;
  especializacion?: string;
  numeroReTHUS?: string;
  documentos: DocumentoSubido[];
  dataBiometrica?: BiometricData;
  estado: 'pendiente' | 'validado' | 'rechazado';
  oficinaVentas?: string;
  cuotaInicial?: number;
  createdAt: string;
}

export interface PersonaJuridica {
  id?: string;
  razonSocial: string;
  nit: string;
  tipoSociedad: 'sas' | 'ltda' | 'sa' | 'cooperativa' | 'fundacion';
  fechaConstitucion: string;
  representanteLegal: {
    nombres: string;
    apellidos: string;
    tipoDocumento: 'cedula' | 'pasaporte';
    numeroDocumento: string;
    telefono: string;
    email: string;
  };
  contactoEmpresa: {
    telefono: string;
    email: string;
    direccion: string;
    ciudad: string;
    departamento: string;
  };
  actividadEconomica: string;
  codigoCIIU: string;
  documentos: DocumentoSubido[];
  dataBiometrica?: BiometricData;
  estado: 'pendiente' | 'validado' | 'rechazado';
  oficinaVentas?: string;
  cuotaInicial?: number;
  createdAt: string;
}

export interface DocumentoSubido {
  id: string;
  tipo: 'cedula' | 'rut' | 'diploma' | 'rethus' | 'camara_comercio' | 'otro';
  nombre: string;
  url: string;
  validado: boolean;
  fechaSubida: string;
}

export interface BiometricData {
  tipo: 'huella' | 'facial';
  hash: string;
  validado: boolean;
  fechaRegistro: string;
}

export interface Usuario {
  id: string;
  email: string;
  rol: UserRole;
  activo: boolean;
  datosPersonales: PersonaNatural | PersonaJuridica;
  tipoUsuario: UserType;
}

export interface Notificacion {
  id: string;
  usuarioId: string;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
  leida: boolean;
  fechaCreacion: string;
}

export interface OficinaVentas {
  id: string;
  nombre: string;
  ciudad: string;
  capacidad: number;
  usuariosAsignados: number;
  especialidades: string[];
}