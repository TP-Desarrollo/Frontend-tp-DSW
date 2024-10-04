import { Routes } from '@angular/router';
import { VehicleTemplateComponent } from './core/components/vehicles/vehicle-template/vehicle-template.component';
import { LocalityTemplateComponent } from './core/components/locality/locality-template/locality-template.component.js';
import { VehicleTypeTemplateComponent } from './core/components/vehicleType/vehicle-type-template/vehicle-type-template.component.js';
import { RentTemplateComponent } from './core/components/rent/rent-template/rent-template.component.js';
import { CustomerTemplateComponent } from './core/components/customer/customer-template/customer-template.component.js';


export const routes: Routes = [
  { path:'rentals', component: RentTemplateComponent},
  { path:'customers', component: CustomerTemplateComponent},
  { path:'employees', component: VehicleTemplateComponent},
  { path:'localities', component: LocalityTemplateComponent},
  { path:'vehicles', component: VehicleTemplateComponent},
  { path:'vehicles-types', component: VehicleTypeTemplateComponent},   
];
