import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehiculo } from '../../models/interfaces';

@Component({
  selector: 'app-vehiculo-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehiculo-filter.component.html',
  styleUrls: ['./vehiculo-filter.component.css']
})
export class VehiculoFilterComponent {
  @Input() vehiculos: Vehiculo[] = [];
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  tiposVehiculo: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['vehiculos'] && this.vehiculos) {
      this.actualizarTiposVehiculo();
    }
  }

  actualizarTiposVehiculo() {
    const tipos = new Set(this.vehiculos.map(v => v.tipoVehiculo.tipo));
    this.tiposVehiculo = Array.from(tipos);
  }

  onFilterChange(event: Event) {
    const selectedTipo = (event.target as HTMLSelectElement).value;
    this.filterChanged.emit(selectedTipo);
  }
}
