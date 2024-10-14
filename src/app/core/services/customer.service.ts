import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse, Customer } from '../components/models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getCustomers(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}/customers`);
  }

  updateCustomer(customer: Customer): Observable<ApiResponse> {
    const id = customer.id;
    // Create a new object with locality.id instead of the full locality object
    const customerToUpdate = {
      ...customer,
      locality: customer.locality?.id  // Send only the locality ID
    };
    return this.httpClient.put<ApiResponse>(`${this.apiUrl}/customers/${id}`, customerToUpdate)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

}
