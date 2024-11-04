import { Component } from '@angular/core';
import { VehicleType, ApiResponse } from '../../models/interfaces.js';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VehicleTypeService } from '../../../services/vehicle-type.service.js';
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
  vehicleTypeData: VehicleType[] = [];

  constructor(
    private vehicleTypeService: VehicleTypeService,
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
    console.log("delete button")
  }

}
