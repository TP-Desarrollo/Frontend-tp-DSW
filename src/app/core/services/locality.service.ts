import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse, Locality } from '../components/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalityService {
  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getLocalities(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}/localities`);
  }

  addLocality(locality: Locality): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${this.apiUrl}/localities`, locality)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next()
      })
    );
  }

  updateLocality(locality: Locality): Observable<ApiResponse> {
    const id = locality.id;
    return this.httpClient.put<ApiResponse>(`${this.apiUrl}/localities/${id}`, locality)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next()
      })
    );
  }

  deleteLocality(locality: Locality): Observable<ApiResponse> {
    const id = locality.id;
    return this.httpClient.delete<ApiResponse>(`${this.apiUrl}/localities/${id}`);
  }
}
