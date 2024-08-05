import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../models/interfaces';

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
