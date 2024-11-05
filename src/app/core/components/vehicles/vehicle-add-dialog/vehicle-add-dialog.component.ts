import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse, VehicleType } from '../../models/interfaces';
import { VehicleTypeService } from '../../../services/vehicle-type.service';
import { VehicleCardComponent } from '../vehicle-card/vehicle-card.component.js';

@Component({
  selector: 'app-vehicle-add-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatDialogModule, MatSelectModule],
  templateUrl: './vehicle-add-dialog.component.html',
  styleUrl: './vehicle-add-dialog.component.css'
})
export class VehicleAddDialogComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicleTypes: VehicleType[] = [];
  selectedFile: File | null = null;
  vehicleCard: VehicleCardComponent | undefined;

  constructor(
    private dialogRef: MatDialogRef<VehicleAddDialogComponent>,
    private vehicleTypeService: VehicleTypeService,
    private fb: FormBuilder
  ) {
    this.vehicleForm = this.fb.group({
      licensePlate: ['', Validators.required, Validators.minLength(6), Validators.maxLength(7), Validators.pattern(/^[a-zA-Z0-9]*$/)],
      brand: ['', Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)],
      model: ['', Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]*$/)],
      status: ['Available', Validators.required], // On review
      vehicleType: [null, Validators.required]
    });
  }

  ngOnInit() {
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

  onVehicleTypeSelect(event: any): void {
    this.vehicleForm.patchValue({ vehicleType: event.value });
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.vehicleForm.valid && this.selectedFile) {
      this.dialogRef.close({
        vehicleData: this.vehicleForm.value,
        file: this.selectedFile
      });
    } else {
      console.error('Form is invalid or no file selected');
      this.vehicleForm.markAllAsTouched();
    }
  }
}