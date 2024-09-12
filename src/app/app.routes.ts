import { Routes } from '@angular/router';
import { VehicleTemplateComponent } from './core/components/vehicles/vehicle-template/vehicle-template.component';
import { LocalityTemplateComponent } from './core/components/locality/locality-template/locality-template.component.js';


export const routes: Routes = [
  { path:'rentals', component: VehicleTemplateComponent},
  { path:'customers', component: VehicleTemplateComponent},
  { path:'employees', component: VehicleTemplateComponent},
  { path:'localities', component: LocalityTemplateComponent},
  { path:'vehicles', component: VehicleTemplateComponent},
  { path:'vehicles-types', component: VehicleTemplateComponent},   
];
