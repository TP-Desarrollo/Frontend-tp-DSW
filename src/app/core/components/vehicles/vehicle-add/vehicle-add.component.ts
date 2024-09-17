import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { VehicleAddDialogComponent } from '../vehicle-add-dialog/vehicle-add-dialog.component.js';
import { VehicleService } from '../../../services/vehicle.service.js';

@Component({
  selector: 'app-vehicle-add',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css'],
})
export class VehicleAddComponent {
  @Output() vehicleAdded = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private vehicleService: VehicleService) {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(VehicleAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { vehicleData, file } = result;
        this.vehicleService.addVehicle(vehicleData, file).subscribe({
          next: (response) => {
            console.log('Vehicle added successfully:', response);
          },
          error: (error) => {
            console.error('Error adding vehicle:', error);
          }
        });
      }
    });
  }
}