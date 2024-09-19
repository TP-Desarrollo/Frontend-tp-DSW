import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vehicle-type-add-dialog',
  standalone: true,
  imports: [CommonModule ,MatDialogModule, MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './vehicle-type-add-dialog.component.html',
  styleUrl: './vehicle-type-add-dialog.component.css'
})
export class VehicleTypeAddDialogComponent {

  vehicleType = {
    type: '',
    description: ''
  };

  constructor(private dialogRef: MatDialogRef<VehicleTypeAddDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.vehicleType.type && this.vehicleType.description) {
      this.dialogRef.close(this.vehicleType);
    } else {
      console.error('Type and description are required');
    }
  }

}
