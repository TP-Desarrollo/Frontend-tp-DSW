import { Component } from '@angular/core';
import { VehicleTypeCardComponent } from "../vehicle-type-card/vehicle-type-card.component";
import { VehicleTypeAddComponent } from "../vehicle-type-add/vehicle-type-add.component";
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-vehicle-type-template',
  standalone: true,
  imports: [VehicleTypeCardComponent, VehicleTypeAddComponent],
  templateUrl: './vehicle-type-template.component.html',
  styleUrl: './vehicle-type-template.component.css'
})
export class VehicleTypeTemplateComponent {
  @ViewChild(VehicleTypeCardComponent) vehicleTypeCardComponent!: VehicleTypeCardComponent;
}
