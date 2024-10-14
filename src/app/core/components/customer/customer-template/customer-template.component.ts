import { Component } from '@angular/core';
import { CustomerTableComponent } from "../customer-table/customer-table.component";

@Component({
  selector: 'app-customer-template',
  standalone: true,
  imports: [CustomerTableComponent],
  templateUrl: './customer-template.component.html',
  styleUrl: './customer-template.component.css'
})
export class CustomerTemplateComponent {

}
