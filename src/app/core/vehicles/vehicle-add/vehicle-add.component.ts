import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-add',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  template: '<button mat-raised-button color="primary" (click)="openAddVehicleDialog()">Add Vehicle</button>',
  styles: ['button { margin-left: 10px; }'],
})
export class VehicleAddComponent {
  @Output() vehicleAdded = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  openAddVehicleDialog() {
    console.log('Add vehicle dialog should open here');
    this.vehicleAdded.emit();
  }
}