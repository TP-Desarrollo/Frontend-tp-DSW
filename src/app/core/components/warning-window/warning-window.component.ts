import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WarningWindowData } from '../models/interfaces.js';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-warning-window',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './warning-window.component.html',
  styleUrl: './warning-window.component.css'
})
export class WarningWindowComponent {
  constructor(
    public dialogRef: MatDialogRef<WarningWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WarningWindowData
  ) {}

  onConfirm(): void {
    this.dialogRef.close();
  }
}
