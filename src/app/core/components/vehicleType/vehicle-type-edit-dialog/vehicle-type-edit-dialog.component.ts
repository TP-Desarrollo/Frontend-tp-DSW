import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Inject } from '@angular/core';
import { VehicleType } from '../../models/interfaces.js';
import { VehicleTypeService } from '../../../services/vehicle-type.service.js';

@Component({
  selector: 'app-vehicle-type-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './vehicle-type-edit-dialog.component.html',
  styleUrl: './vehicle-type-edit-dialog.component.css'
})
export class VehicleTypeEditDialogComponent {
  vehicleTypeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<VehicleTypeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicleType: VehicleType,
    private vehicleTypeService: VehicleTypeService,
    private fb: FormBuilder
  ) {
    this.vehicleTypeForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.vehicleTypeForm.patchValue(this.vehicleType);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.vehicleTypeForm.valid) {
      const updatedVehicleType: VehicleType = {
        ...this.vehicleType,
        ...this.vehicleTypeForm.value
      };

      this.vehicleTypeService.updateVehicleType(updatedVehicleType).subscribe({
        next: (response) => {
          console.log('Vehicle Type updated successfully', response);
          this.dialogRef.close(updatedVehicleType);
        },
        error: (error) => {
          console.error('Error updating vehicle type', error);
          // Handle error (e.g., show error message to user)
        }
      });
    }
  }
}
