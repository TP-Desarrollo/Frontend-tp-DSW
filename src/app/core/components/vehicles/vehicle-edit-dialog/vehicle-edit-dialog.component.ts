import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from '../../../services/vehicle.service';
import { VehicleTypeService } from '../../../services/vehicle-type.service';
import { Vehicle, VehicleType, ApiResponse } from '../../models/interfaces';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vehicle-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatOptionModule],
  templateUrl: './vehicle-edit-dialog.component.html',
  styleUrls: ['./vehicle-edit-dialog.component.css'],
})
export class VehicleEditDialogComponent implements OnInit {
  editForm: FormGroup;
  vehicleTypes: VehicleType[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: Vehicle },
    private vehicleService: VehicleService,
    private vehicleTypeService: VehicleTypeService
  ) {
    this.editForm = this.fb.group({
      licensePlate: [data.vehicle.licensePlate, Validators.required],
      brand: [data.vehicle.brand, Validators.required],
      model: [data.vehicle.model, Validators.required],
      status: [data.vehicle.status, Validators.required],
      vehicleType: [data.vehicle.vehicleType.id, Validators.required],
      imageUrl: [data.vehicle.imageUrl]
    });
  }

  ngOnInit(): void {
    this.loadVehicleTypes();
  }

  loadVehicleTypes() {
    this.vehicleTypeService.getVehicleTypes().subscribe({
      next: (response: ApiResponse) => {
        this.vehicleTypes = response.data; 
      },
      error: (error) => {
        console.error('Error fetching vehicle types:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onVehicleTypeSelect(event: any): void {
    this.editForm.value.vehicleType = event.value;
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const formData = new FormData();
      Object.keys(this.editForm.value).forEach(key => {
        formData.append(key, this.editForm.value[key]);
      });

      if (this.selectedFile) {
        formData.append('imageUrl', this.selectedFile, this.selectedFile.name);
      }

      this.vehicleService.updateVehicle(this.data.vehicle.id, formData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (error) => console.error('Error updating vehicle:', error)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}