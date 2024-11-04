import { Component } from '@angular/core';
import { VehicleType, ApiResponse, Vehicle } from '../../models/interfaces.js';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VehicleTypeService } from '../../../services/vehicle-type.service.js';
import { VehicleService } from '../../../services/vehicle.service.js';
import { VehicleTypeEditDialogComponent } from '../vehicle-type-edit-dialog/vehicle-type-edit-dialog.component.js';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-type-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, VehicleTypeEditDialogComponent],
  templateUrl: './vehicle-type-card.component.html',
  styleUrl: './vehicle-type-card.component.css'
})
export class VehicleTypeCardComponent {
  apiResponse: ApiResponse | undefined;
  vehicleData: Vehicle[] = [];
  vehicleTypeData: VehicleType[] = [];

  constructor(
    private vehicleTypeService: VehicleTypeService,
    private vehicleService: VehicleService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.vehicleTypeService.refreshNeeded$.subscribe(() => {
      this.getVehicleTypes();
    });
    setTimeout(() => {
      this.getVehicleTypes();
    })
  }

  getVehicleTypes() {
    this.vehicleTypeService.getVehicleTypes().subscribe({
      next: (response: ApiResponse) => {
        this.apiResponse = response;
        this.vehicleTypeData = this.apiResponse.data;
      },
      error: (error) => {
        console.log('Error fetching data:', error);
      }
    });
  }

  editVehicleType(vehicleType: VehicleType) {
    const dialogRef = this.dialog.open(VehicleTypeEditDialogComponent, {
      width: '250px',
      data: {...vehicleType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("edit good")
      }
    });
  }

  deleteVehicleType(vehicleType: VehicleType) {
    this.vehicleService.getVehicles().subscribe({
      next: (response: ApiResponse) => {
        this.vehicleData = response.data;
        console.log(this.vehicleData);
      },
      error: (error) => {
        console.log('Error fetching data:', error);
      }
    })
    if (this.vehicleData.length > 0) {
      return console.log("vehicle type has vehicles");
    }
    else {
      this.vehicleTypeService.deleteVehicleType(vehicleType).subscribe({
        next: (response: ApiResponse) => {
          console.log(response);
          this.getVehicleTypes();
        },
        error: (error) => {
          console.log('Error deleting vehicle type:', error);
        }
      })
    }
  }

}
