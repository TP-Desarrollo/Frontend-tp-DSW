import { Component, OnInit } from '@angular/core';
import { ApiResponse, Vehicle } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../services/vehicle.service';


@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {
  
  vehicleData: ApiResponse | undefined;
  filteredVehicles: Vehicle[] = [];
  imgPath = 'http://localhost:3000/uploads/';

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getData();
  } 

  getData() {
    this.vehicleService.getVehicles().subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        this.vehicleData = response;
        this.filteredVehicles = this.vehicleData.data;
      },
      error: (error) => {
        console.log('Error fetching data:', error);
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