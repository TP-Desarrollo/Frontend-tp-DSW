import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse, Vehicle } from '../components/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getVehicles(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}/vehicles`);
  }

  addVehicle(vehicleData: any, file: File): Observable<ApiResponse> {
    const formData = new FormData();
    
    // Append text data
    Object.keys(vehicleData).forEach(key => {
      formData.append(key, vehicleData[key]);
    });
    
    // Append file
    formData.append('imageUrl', file, file.name);

    return this.httpClient.post<ApiResponse>(`${this.apiUrl}/vehicles`, formData)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  deleteVehicle(vehicle: Vehicle): Observable<ApiResponse> {
    const id = vehicle.id;
    return this.httpClient.delete<ApiResponse>(`${this.apiUrl}/vehicles/${id}`);
  }

}

