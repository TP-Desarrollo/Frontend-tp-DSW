import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Customer } from '../../models/interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomerService } from '../../../services/customer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [ MatFormFieldModule, MatPaginatorModule, MatSortModule, MatTableModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'dni', 'firstName', 'lastName', 'email', 'address', 'phone', 'locality'];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(    
    private customerService: CustomerService,
  ) {
    this.dataSource = new MatTableDataSource<Customer>([]);
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(customers => {
      this.dataSource.data = customers.data;
      console.log(this.dataSource.data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}