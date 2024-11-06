import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from '../../../services/vehicle.service';
import { VehicleTypeService } from '../../../services/vehicle-type.service';
import { Vehicle, VehicleType, ApiResponse } from '../../models/interfaces';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-vehicle-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatOptionModule, MatDialogModule, MatButtonModule],
  templateUrl: './vehicle-edit-dialog.component.html',
  styleUrls: ['./vehicle-edit-dialog.component.css'],
})
export class VehicleEditDialogComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicleTypes: VehicleType[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: Vehicle },
    private vehicleService: VehicleService,
    private vehicleTypeService: VehicleTypeService
  ) {
    this.vehicleForm = this.fb.group({
      licensePlate: [data.vehicle.licensePlate, [Validators.required, Validators.minLength(6), Validators.maxLength(7), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      brand: [data.vehicle.brand, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      model: [data.vehicle.model, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      status: [data.vehicle.status, Validators.required], // On review
      vehicleType: [data.vehicle.vehicleType.id, Validators.required], // On review
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
    this.vehicleForm.value.vehicleType = event.value;
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const formData = new FormData();
      Object.keys(this.vehicleForm.value).forEach(key => {
        formData.append(key, this.vehicleForm.value[key]);
      });

      if (this.selectedFile) {
        formData.append('imageUrl', this.selectedFile, this.selectedFile.name);
      }
      
      console.log(this.vehicleForm.value.vehicleType)

      this.vehicleService.updateVehicle(this.data.vehicle.id, formData).subscribe({
        next: (response: ApiResponse) => {
        // Get the vehicle type object from the vehicleTypeService using the selected ID
        this.vehicleTypeService.getVehicleType(this.vehicleForm.value.vehicleType).subscribe({
          next: (vehicleTypeResponse: ApiResponse) => {
            // Assign the vehicle type object to the vehicle
            this.data.vehicle.vehicleType = vehicleTypeResponse.data;
            this.dialogRef.close(this.data.vehicle);
          },
          error: (error) => console.error('Error fetching vehicle type:', error)
        });
      },
        error: (error) => console.error('Error updating vehicle:', error)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}