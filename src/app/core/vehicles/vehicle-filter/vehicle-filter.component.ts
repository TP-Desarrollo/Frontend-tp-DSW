import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/interfaces';

@Component({
  selector: 'app-vehicle-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-filter.component.html',
  styleUrls: ['./vehicle-filter.component.css']
})
export class VehicleFilterComponent {
  @Input() vehicles: Vehicle[] = [];
  @Output() filterChange = new EventEmitter<string>();

  vehicleTypes: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['vehicles'] && this.vehicles) {
      this.updateVehicleType();
    }
  }

  updateVehicleType() {
    const types = new Set(this.vehicles.map(v => v.vehicleType.type));
    this.vehicleTypes = Array.from(types);
  }

  onFilterChange(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;
    this.filterChange.emit(selectedType);
  }
}
