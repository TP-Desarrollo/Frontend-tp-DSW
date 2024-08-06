import { Routes } from '@angular/router';
import { LocalidadComponent } from './core/localidad/localidad.component.js';
import { VehiculosComponent } from './core/vehiculos/vehiculos.component.js';

export const routes: Routes = [
  { path:'api/localidades', component: LocalidadComponent },
  { path:'api/vehiculos', component: VehiculosComponent }
];
