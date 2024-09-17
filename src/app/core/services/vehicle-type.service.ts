import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiResponse, VehicleType } from '../components/models/interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getVehicleTypes(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}/vehicle-types`)
  }

  
  addVehicleType(vehicleType: VehicleType): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${this.apiUrl}/vehicle-types`, vehicleType)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next()
      })
    );
  }

  deleteVehicleType(vehicleType: VehicleType): Observable<ApiResponse> {
    const id = vehicleType.id;
    return this.httpClient.delete<ApiResponse>(`${this.apiUrl}/vehicle-types/${id}`);
  }

}
