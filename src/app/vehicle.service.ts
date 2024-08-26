import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Vehicle } from './core/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/vehicles';

  constructor(private httpClient: HttpClient) {}

  getVehicles(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.apiUrl);
  }

}