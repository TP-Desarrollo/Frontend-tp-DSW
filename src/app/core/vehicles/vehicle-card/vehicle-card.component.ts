import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Vehicle } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { VehicleFilterComponent } from '../vehicle-filter/vehicle-filter.component.js';
import { VehicleAddComponent } from '../vehicle-add/vehicle-add.component.js';

@Component({
  selector: 'app-vehiculo-card',
  standalone: true,
  imports: [CommonModule, VehicleFilterComponent, VehicleAddComponent],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {
  private httpClient = inject(HttpClient);
  vehicleData: ApiResponse | undefined;
  filteredVehicles: Vehicle[] = [];
  imgPath = 'http://localhost:3000/uploads/';

  ngOnInit(): void {
    this.getData();
  } 

  getData() {
    this.httpClient.get<ApiResponse>('http://localhost:3000/vehicles').subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        this.vehicleData = response;
        this.filteredVehicles = this.vehicleData.data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  editVehicle(vehicle: Vehicle) {
    console.log(vehicle) //Agregar funcionalidad
  }

  deleteVehicle(vehicle: Vehicle) {
    console.log(vehicle) //Agregar funcionalidad
  }

  onFilterChange(type: string) {
    if (type === 'All') {
      this.filteredVehicles = this.vehicleData?.data || [];
    } else {
      this.filteredVehicles = this.vehicleData?.data.filter((v: Vehicle) => v.vehicleType.type === type) || [];
    }
  }

  onVehicleAdded() {
    console.log('New vehicle added');
    this.getData(); // Refrescar la lista de vehículos
  }

}