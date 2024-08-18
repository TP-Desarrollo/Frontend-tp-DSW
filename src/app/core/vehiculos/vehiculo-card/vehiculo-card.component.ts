import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../models/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehiculo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehiculo-card.component.html',
  styleUrl: './vehiculo-card.component.css'
})
export class VehiculoCardComponent {
  private httpClient = inject(HttpClient);
  vehiculoData: ApiResponse | undefined;

  ngOnInit(): void {
    this.getData();
  } 

  getData() {
    this.httpClient.get<ApiResponse>('http://localhost:3000/vehiculos').subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        this.vehiculoData = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  editarVehiculo(vehiculo: any) {
    console.log(vehiculo)
  }

  eliminarVehiculo(vehiculo: any) {
    console.log(vehiculo)
  }
}