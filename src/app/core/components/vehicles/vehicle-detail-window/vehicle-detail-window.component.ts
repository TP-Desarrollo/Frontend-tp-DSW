import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Vehicle } from '../../models/interfaces';

@Component({
  selector: 'app-vehicle-detail-window',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './vehicle-detail-window.component.html',
  styleUrl: './vehicle-detail-window.component.css'
})
export class VehicleDetailWindowComponent {
 imgPath = 'http://localhost:3000/uploads/';
  
  constructor(
    public dialogRef: MatDialogRef<VehicleDetailWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: Vehicle }
  ) {
    console.log(this.data.vehicle.vehicleType)
  }

  getStatusClass(status: string): string {
  // Convert the status to lowercase and replace spaces/underscores with hyphens
    return status.toLowerCase().replace(/[\s_]+/g, '-');
  }
}
