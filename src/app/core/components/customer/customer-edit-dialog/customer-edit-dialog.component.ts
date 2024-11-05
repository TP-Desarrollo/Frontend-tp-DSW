import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Customer, Locality, ApiResponse } from '../../models/interfaces.js';
import { CustomerService } from '../../../services/customer.service.js';
import { LocalityService } from '../../../services/locality.service.js';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-customer-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormField, MatInputModule, MatButtonModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './customer-edit-dialog.component.html',
  styleUrl: './customer-edit-dialog.component.css'
})
export class CustomerEditDialogComponent implements OnInit {
customerForm: FormGroup;
  localities: Locality[] = [];
  filteredLocalities: Observable<Locality[]>;

  constructor(
    public dialogRef: MatDialogRef<CustomerEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private customerService: CustomerService,
    private localityService: LocalityService,
    private fb: FormBuilder
  ) {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      address: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      phone: ['', [Validators.required,Validators.minLength(9), Validators.maxLength(25), Validators.pattern(/^[0-9]*$/)]],
      dni: ['', [Validators.required,Validators.minLength(7), Validators.maxLength(8), Validators.pattern(/^[0-9]*$/)]], 
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
      locality: ['', Validators.required]  // On review of other validators
    });

    // Initialize filteredLocalities here
    this.filteredLocalities = this.customerForm.get('locality')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterLocalities(name) : this.localities.slice();
      })
    );
  }

  ngOnInit(): void {
    this.loadLocalities();
    this.initializeForm();
  }

  loadLocalities() {
    this.localityService.getLocalities().subscribe(
      (response: ApiResponse) => {
        this.localities = response.data;
      },
      error => console.error('Error loading localities', error)
    );
  }

  initializeForm() {
    this.customerForm.patchValue({
      ...this.data,
      locality: this.data.locality  // Use the full locality object
    });
  }

  private _filterLocalities(value: string): Locality[] {
    const filterValue = value.toLowerCase();
    return this.localities.filter(locality => 
      locality.name.toLowerCase().includes(filterValue) ||
      locality.province.toLowerCase().includes(filterValue)
    );
  }

  displayLocality(locality: Locality): string {
    return locality ? `${locality.name}, ${locality.province}` : '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.customerForm.valid) {
      const formValue = this.customerForm.value;
      const updatedCustomer: Customer = {
        ...this.data,
        ...formValue,
        locality: formValue.locality  // Use the full locality object
      };
      
      this.customerService.updateCustomer(updatedCustomer).subscribe({
        next: (response) => {
          console.log('Customer updated successfully', response);
          this.dialogRef.close(updatedCustomer);
        },
        error: (error) => {
          console.error('Error updating customer', error);
          // Handle error (e.g., show error message to user)
        }
      });
    }
  }
}
