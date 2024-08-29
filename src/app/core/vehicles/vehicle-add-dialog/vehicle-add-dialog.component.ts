import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ApiResponse, Vehicle, VehicleType } from '../../models/interfaces';
import { VehicleService } from '../../../vehicle.service';
import { VehicleTypeService } from '../../../vehicle-type.service';

@Component({
  selector: 'app-vehicle-add-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatDialogModule, MatSelectModule],
  templateUrl: './vehicle-add-dialog.component.html',
  styleUrl: './vehicle-add-dialog.component.css'
})
export class VehicleAddDialogComponent implements OnInit {
  vehicle = {
    licensePlate: '',
    brand: '',
    model: '',
    status: 'Available',
    vehicleType: {} as VehicleType,
    imageUrl: ''
  };

  vehicleTypes: VehicleType[] = [];
  selectedFile: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<VehicleAddDialogComponent>,
    private vehicleService: VehicleService,
    private vehicleTypeService: VehicleTypeService
  ) {}

   ngOnInit() {
    this.loadVehicleTypes();
  }

  loadVehicleTypes() {
    this.vehicleTypeService.getVehicleTypes().subscribe({
      next: (response) => {
        console.log('API Response:', response); // Verificar la respuesta completa de la API
        this.vehicleTypes = response.data; // Asignar directamente como un array de VehicleType
        console.log('Vehicle Types:', this.vehicleTypes); // Verificar los tipos de vehículos después de mapear
      },
      error: (error) => {
        console.error('Error fetching vehicle types:', error); // Manejo de errores
      }
    });
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
    if (this.selectedFile) {
      this.vehicleService.uploadImage(this.selectedFile).subscribe({
        next: (imageUrl: string) => {
          this.vehicle.imageUrl = imageUrl;
          this.dialogRef.close(this.vehicle);
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        }
      });
    } else {
      this.dialogRef.close(this.vehicle);
    }
  }

}
