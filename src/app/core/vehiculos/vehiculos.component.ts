import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/interfaces';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent {
  httpClient = inject(HttpClient);
  data: ApiResponse | undefined;

  ngOnInit(): void {
    this.getData();
  } 

  ngOnChanges(): void {
    this.getData();
  }

  getData() {
    this.httpClient.get<ApiResponse>('http://localhost:3000/api/vehiculos').subscribe({
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
