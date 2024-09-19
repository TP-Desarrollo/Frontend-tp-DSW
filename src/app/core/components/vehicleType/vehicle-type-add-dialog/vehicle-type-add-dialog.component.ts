import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vehicle-type-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './vehicle-type-add-dialog.component.html',
  styleUrl: './vehicle-type-add-dialog.component.css'
})
export class VehicleTypeAddDialogComponent implements OnInit {

  vehicleTypeForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<VehicleTypeAddDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.vehicleTypeForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.vehicleTypeForm.valid) {
      this.dialogRef.close(this.vehicleTypeForm.value);
    } else {
      this.vehicleTypeForm.markAllAsTouched();
    }
  }
}