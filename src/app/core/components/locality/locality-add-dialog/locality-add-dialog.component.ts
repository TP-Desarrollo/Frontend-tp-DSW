import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-locality-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './locality-add-dialog.component.html',
  styleUrl: './locality-add-dialog.component.css'
})
export class LocalityAddDialogComponent implements OnInit {
  
  localityForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LocalityAddDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.localityForm = this.fb.group({
    name: ['', Validators.required],
    province: ['', Validators.required]
  })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.localityForm.valid) {
      this.dialogRef.close(this.localityForm.value);
    } else {
      this.localityForm.markAllAsTouched();
    }
  }
}