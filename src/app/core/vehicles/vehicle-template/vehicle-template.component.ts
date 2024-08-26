import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { VehicleCardComponent } from '../vehicle-card/vehicle-card.component.js';
import { VehicleFilterComponent } from '../vehicle-filter/vehicle-filter.component.js';
import { VehicleAddComponent } from '../vehicle-add/vehicle-add.component.js';

@Component({
  selector: 'app-vehicle-template',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent, VehicleFilterComponent, VehicleAddComponent],
  templateUrl: './vehicle-template.component.html',
  styleUrl: './vehicle-template.component.css'
})
export class VehicleTemplateComponent implements AfterViewInit {
  
  @ViewChild(VehicleCardComponent) vehicleCardComponent!: VehicleCardComponent;

  ngAfterViewInit() {
    // Asegúrate de que vehicleCardComponent esté inicializado
  }

  onFilterChange(type: string) {
    if (this.vehicleCardComponent) {
      this.vehicleCardComponent.onFilterChange(type);
    }
  }
}
