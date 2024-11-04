import { Component } from '@angular/core';
import { VehicleType, ApiResponse, Vehicle } from '../../models/interfaces.js';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VehicleTypeService } from '../../../services/vehicle-type.service.js';
import { VehicleService } from '../../../services/vehicle.service.js';
import { VehicleTypeEditDialogComponent } from '../vehicle-type-edit-dialog/vehicle-type-edit-dialog.component.js';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../delete-confirmation-dialog/delete-confirmation-dialog.component.js';
import { WarningWindowComponent } from '../../warning-window/warning-window.component.js';

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

    this.vehicleTypeService.updateVehicleType(vehicleType).subscribe({
      next: (response) => {
        console.log('Vehicle Type updated successfully', response);
        this.vehicleTypeService.emitVehicleTypeUpdated(vehicleType);
      },
      error: (error) => {
        console.error('Error updating vehicle type', error);
      }
    });

  }

  deleteVehicleType(vehicleType: VehicleType) {
    this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        title: 'Delete Vehicle Type',
        message: `Are you sure you want to delete the vehicle: ${vehicleType.type}?`,
        confirmLabel: 'Delete'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.vehicleTypeService.deleteVehicleType(vehicleType).subscribe({
          next: (response: ApiResponse) => {
            console.log(response);
            this.getVehicleTypes();
          },
          error: (error) => {
            if (error.status == 400) {
              this.dialog.open(WarningWindowComponent, {
                data: {
                  title: 'Warning',
                  message: 'Cannot delete vehicle type because it is associated with vehicles. First delete the associated vehicles.'
                }
              })
            }
            else {
              console.log('Error deleting vehicle type:', error);
            }
          }
        })
      }
    });
  }
}