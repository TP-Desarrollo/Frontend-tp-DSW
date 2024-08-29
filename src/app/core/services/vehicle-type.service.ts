import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, VehicleType } from '../components/models/interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getVehicleTypes(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}/vehicle-types`)
  }

}
