import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Localidad {
  id: number;
  nombre: string;
  provincia: string;
  clientes: []; // Falta revisar esto, no muestra los clientes de una localidad (igual es tema del back que tampoco los muestra en la request)
}               // Hay que agregar la interfaz de cliente despues de arreglar lo del back

interface ApiResponse {
  message: string;
  data: Localidad[];
}

@Component({
  selector: 'app-localidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './localidad.component.html',
  styleUrl: './localidad.component.css'
})
export class LocalidadComponent implements OnInit {

  httpClient = inject(HttpClient);
  data: ApiResponse | undefined;

  ngOnInit(): void {
    this.getData();
  } 

  getData() {
    this.httpClient.get<ApiResponse>('http://localhost:3000/api/localidades').subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        this.data = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }
}
