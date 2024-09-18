import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Inject } from '@angular/core';
import { Locality } from '../../models/interfaces.js';
import { LocalityService } from '../../../services/locality.service.js';

@Component({
  selector: 'app-locality-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './locality-edit-dialog.component.html',
  styleUrl: './locality-edit-dialog.component.css'
})
export class LocalityEditDialogComponent {
  localityForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LocalityEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public locality: Locality,
    private localityService: LocalityService,
    private fb: FormBuilder
  ) {
    this.localityForm = this.fb.group({
      name: ['', Validators.required],
      province: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.localityForm.patchValue(this.locality);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.localityForm.valid) {
      const updatedLocality: Locality = {
        ...this.locality,
        ...this.localityForm.value
      };

      this.localityService.updateLocality(updatedLocality).subscribe({
        next: (response) => {
          console.log('Locality updated successfully', response);
          this.dialogRef.close(updatedLocality);
        },
        error: (error) => {
          console.error('Error updating locality', error);
          // Handle error (e.g., show error message to user)
        }
      });
    }
  }
}
