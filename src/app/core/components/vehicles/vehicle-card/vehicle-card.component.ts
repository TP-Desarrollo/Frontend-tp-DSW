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

    this.vehicleService.refreshNeeded$.subscribe(() => {
      this.getData();
    });
    this.getData();
    
  } 

  getData() {
    this.vehicleService.getVehicles().subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        this.vehicleData = response;
        this.filteredVehicles = this.vehicleData.data;
        console.log(this.filteredVehicles);
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
    this.vehicleService.deleteVehicle(vehicle).subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        this.getData();
      },
      error: (error) => {
        console.log('Error deleting vehicle:', error);
      }
    })
  }

  onFilterChange(type: string) {
    if (type === 'All') {
      this.filteredVehicles = this.vehicleData?.data || [];
      console.log(this.filteredVehicles);
    } else {
      this.filteredVehicles = this.vehicleData?.data.filter((v: Vehicle) => v.vehicleType.type === type) || [];
      console.log(this.filteredVehicles);
    }
  }

}