import { Component, OnInit } from '@angular/core';
import { ApiResponse, Vehicle } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../services/vehicle.service';
import { MatDialog } from '@angular/material/dialog';
import { VehicleEditDialogComponent } from '../vehicle-edit-dialog/vehicle-edit-dialog.component.js';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent implements OnInit {
  
  vehicleData: ApiResponse | undefined;
  filteredVehicles: Vehicle[] = [];
  imgPath = 'http://localhost:3000/uploads/';

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog) {}

  ngOnInit(): void {

    this.vehicleService.refreshNeeded$.subscribe(() => {
      this.getVehicles();
    });
    setTimeout(() => {
      this.getVehicles();
    })
  
  } 

  getVehicles() {
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
    const dialogRef = this.dialog.open(VehicleEditDialogComponent, {data: { vehicle: vehicle } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getVehicles();
      }
    });
  }

  deleteVehicle(vehicle: Vehicle) {
    this.vehicleService.deleteVehicle(vehicle).subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        this.getVehicles();
      },
      error: (error) => {
        console.log('Error deleting vehicle:', error);
      }
    })
  }

  onFilterChange(type: string) {
    if (type === 'All') {
      this.filteredVehicles = this.vehicleData?.data || [];
    } else {
      this.filteredVehicles = this.vehicleData?.data.filter((v: Vehicle) => v.vehicleType.type === type) || [];
    }
  }

}