import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Vehiculo } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { VehiculoFilterComponent } from '../vehiculo-filter/vehiculo-filter.component.js';

@Component({
  selector: 'app-vehiculo-card',
  standalone: true,
  imports: [CommonModule, VehiculoFilterComponent],
  templateUrl: './vehiculo-card.component.html',
  styleUrl: './vehiculo-card.component.css'
})
export class VehiculoCardComponent {
  private httpClient = inject(HttpClient);
  vehiculoData: ApiResponse | undefined;
  filteredVehiculos: Vehiculo[] = [];

  ngOnInit(): void {
    this.getData();
  } 

  getData() {
    this.httpClient.get<ApiResponse>('http://localhost:3000/vehiculos').subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        this.vehiculoData = response;
        this.filteredVehiculos = this.vehiculoData.data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  editarVehiculo(vehiculo: Vehiculo) {
    console.log(vehiculo) //Agregar funcionalidad
  }

  eliminarVehiculo(vehiculo: Vehiculo) {
    console.log(vehiculo) //Agregar funcionalidad
  }

  onFilterChange(tipo: string) {
    if (tipo === 'Todos') {
      this.filteredVehiculos = this.vehiculoData?.data || [];
    } else {
      this.filteredVehiculos = this.vehiculoData?.data.filter((v: Vehiculo) => v.tipoVehiculo.tipo === tipo) || [];
    }
  }

}