export interface Alquiler {
  id: number;
  cliente: Cliente;
  empleado: Empleado;
  vehiculo: Vehiculo;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string;
  precio: number;
}

export interface Cliente{
    id: number,
    dni: number, 
    nombre: string, 
    email: string,
    clave: string, 
    direccion: string,
    telefono: string,
    apellido: string,
    localidad: Localidad,
    alquileres: Alquiler[],
}

export interface Empleado{
    id: number,
    dni: number, 
    nombre: string, 
    email: string,
    clave: string, 
    alquileres: Alquiler[],
}

export interface Localidad {
  id: number;
  nombre: string;
  provincia: string;
  clientes: Cliente[];
} 

export interface TipoVehiculo {
  id: number;
  tipo: string;
  descripcion: string;
  vehiculos: Vehiculo[];
}

export interface Vehiculo {
  id: number;
  patente: string;
  marca: string;
  modelo: string;
  estado: string;
  tipoVehiculo: TipoVehiculo;
  alquileres: Alquiler[];
}

export interface ApiResponse {
  message: string;
  data: any;  // Revisar esto
}