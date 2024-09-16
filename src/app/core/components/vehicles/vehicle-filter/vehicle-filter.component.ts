import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleTypeService } from '../../../services/vehicle-type.service';
import { VehicleType } from '../../models/interfaces.js';

@Component({
  selector: 'app-vehicle-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-filter.component.html',
  styleUrls: ['./vehicle-filter.component.css']
})
export class VehicleFilterComponent {
 @Output() filterChange = new EventEmitter<string>();

  allTypes: string[] = ['All'];

  constructor(
    private vehicleTypeService: VehicleTypeService) {}

  ngOnInit() {
    this.loadVehicleTypes();
  }

  loadVehicleTypes() {
    this.vehicleTypeService.getVehicleTypes().subscribe({
      next: (response) => {
        this.allTypes = ['All', ...response.data.map((t: VehicleType) => t.type)];
      },
      error: (error) => {
        console.error('Error fetching vehicle types:', error);
      }
    });
  }

  onFilterChange(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;
    this.filterChange.emit(selectedType);
  }

}
