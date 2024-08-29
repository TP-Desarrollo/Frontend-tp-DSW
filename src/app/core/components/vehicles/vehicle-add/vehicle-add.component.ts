import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { VehicleAddDialogComponent } from '../vehicle-add-dialog/vehicle-add-dialog.component.js';
import { Vehicle } from '../../models/interfaces.js';
import { VehicleService } from '../../../services/vehicle.service.js';

@Component({
  selector: 'app-vehicle-add',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  template: '<button mat-raised-button color="primary" (click)="openAddVehicleDialog()">Add Vehicle</button>',
  styles: ['button { margin-left: 10px; }'],
})
export class VehicleAddComponent {
  @Output() vehicleAdded = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private vehicleService: VehicleService) {}

  openAddVehicleDialog() {
    const dialogRef = this.dialog.open(VehicleAddDialogComponent, {
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.addVehicle(result as Vehicle).subscribe({
          next: () => {
            console.log('Vehicle added successfully');
            this.vehicleAdded.emit();
          },
          error: (error) => {
            console.error('Error adding vehicle:', error);
          }
        });
      }
    });
  }
}