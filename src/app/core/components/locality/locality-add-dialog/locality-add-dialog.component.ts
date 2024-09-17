import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-locality-add-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './locality-add-dialog.component.html',
  styleUrl: './locality-add-dialog.component.css'
})
export class LocalityAddDialogComponent {
  locality = {
    name: '',
    province: ''
  };

  constructor(
    private dialogRef: MatDialogRef<LocalityAddDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.locality.name && this.locality.province) {
      this.dialogRef.close(this.locality);
    } else {
      console.error('Name and province are required');
    }
  }

}

