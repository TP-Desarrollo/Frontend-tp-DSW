import { Component } from '@angular/core';
import { VehicleTypeCardComponent } from "../vehicle-type-card/vehicle-type-card.component";

@Component({
  selector: 'app-vehicle-type-template',
  standalone: true,
  imports: [VehicleTypeCardComponent],
  templateUrl: './vehicle-type-template.component.html',
  styleUrl: './vehicle-type-template.component.css'
})
export class VehicleTypeTemplateComponent {

}
