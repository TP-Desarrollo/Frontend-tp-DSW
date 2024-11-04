import { Component, OnInit } from '@angular/core';
import { ApiResponse, Vehicle } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../services/vehicle.service';
import { MatDialog } from '@angular/material/dialog';
import { VehicleEditDialogComponent } from '../vehicle-edit-dialog/vehicle-edit-dialog.component.js';
import { VehicleDetailWindowComponent } from '../vehicle-detail-window/vehicle-detail-window.component.js';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DeleteConfirmationDialogComponent } from '../../delete-confirmation-dialog/delete-confirmation-dialog.component.js';


@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent implements OnInit {
  
  vehicleData: ApiResponse | undefined;
  filteredVehicles: Vehicle[] = [];
  imgPath = 'http://localhost:3000/uploads/';

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog) {}

  ngOnInit(): void {

    this.vehicleService.refreshNeeded$.subscribe(() => {
      this.getVehicles();
    });
    setTimeout(() => {
      this.getVehicles();
    })
  
  } 

  getVehicles() {
    this.vehicleService.getVehicles().subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        this.vehicleData = response;
        this.filteredVehicles = this.vehicleData.data;
        console.log(this.filteredVehicles);
      },
      error: (error) => {
        console.log('Error fetching data:', error);
      }
    });
  }

  editVehicle(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(VehicleEditDialogComponent, {
      data: { vehicle: { ...vehicle } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.filteredVehicles.findIndex(v => v.id === result.id);
        if (index !== -1) {
          this.filteredVehicles[index] = result;
        }
        this.filteredVehicles = [...this.filteredVehicles];
      }
    });
  }

  deleteVehicle(vehicle: Vehicle) {
    this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        title: 'Delete Vehicle',
        message: `Are you sure you want to delete the vehicle: ${vehicle.brand} ${vehicle.model}?`,
        confirmLabel: 'Delete'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.deleteVehicle(vehicle).subscribe({
          next: (response: ApiResponse) => {
            console.log(response);
            this.getVehicles();
          },
          error: (error) => {
            console.log('Error deleting vehicle:', error);
          }
        });
      }
    });
  }

  onFilterChange(type: string) {
    if (type === 'All') {
      this.filteredVehicles = this.vehicleData?.data || [];
    } else {
      this.filteredVehicles = this.vehicleData?.data.filter((v: Vehicle) => v.vehicleType.type === type) || [];
    }
  }

  showVehicleDetails(vehicle: Vehicle, event: Event) {
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }
    this.dialog.open(VehicleDetailWindowComponent, {
      data: { vehicle },
      width: '600px',
      position: { top: '50px' },
      panelClass: 'vehicle-detail-dialog'
    });
  }

}