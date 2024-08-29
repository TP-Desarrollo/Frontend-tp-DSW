import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Vehicle } from './core/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getVehicles(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}/vehicles`);
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient.post<Vehicle>(`${this.apiUrl}/vehicles`, vehicle);
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.httpClient.post<string>(`${this.apiUrl}/uploads`, formData);
  }
}