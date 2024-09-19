import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { VehicleTypeService } from '../../../services/vehicle-type.service.js';
import { VehicleTypeAddDialogComponent } from '../vehicle-type-add-dialog/vehicle-type-add-dialog.component.js';

@Component({
  selector: 'app-vehicle-type-add',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './vehicle-type-add.component.html',
  styleUrl: './vehicle-type-add.component.css'
})
export class VehicleTypeAddComponent {
  @Output() localityAdded = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private vehicleTypeService: VehicleTypeService) {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(VehicleTypeAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const vehicleTypeData = result;
        console.log(vehicleTypeData);
        this.vehicleTypeService.addVehicleType(vehicleTypeData).subscribe({
          next: (response) => {
            console.log('Locality added successfully:', response);
          },
          error: (error) => {
            console.error('Error adding locality:', error);
          }
        });
      }
    });
  }
}