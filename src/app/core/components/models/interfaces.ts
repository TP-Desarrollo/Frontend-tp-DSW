export interface Rental {
  id: number;
  customer: Customer;
  employee: Employee;
  vehicle: Vehicle;
  startDate: Date;
  endDate: Date;
  state: string;
  price: number;
}

export interface Customer{
    id: number,
    dni: number, 
    firstName: string, 
    email: string,
    password: string, 
    address: string,
    phone: string,
    lastName: string,
    locality: Locality,
    rentals: Rental[],
}

export interface Employee{
    id: number,
    dni: number, 
    fullName: string, 
    email: string,
    password: string, 
    rentals: Rental[],
}

export interface Locality {
  id: number;
  name: string;
  province: string;
  customers: Customer[];
} 

export interface VehicleType {
  id: number;
  type: string;
  description: string;
  vehicles: Vehicle[];
}

export interface Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  status: string;
  imageUrl: string;
  vehicleType: VehicleType;
  rentals: Rental[];
}

export interface ApiResponse {
  message: string;
  data: any; 
}

export interface DeleteConfirmationDialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}