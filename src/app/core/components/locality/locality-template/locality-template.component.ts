import { Component } from '@angular/core';
import { LocalityCardComponent } from "../locality-card/locality-card.component";
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-locality-template',
  standalone: true,
  imports: [LocalityCardComponent],
  templateUrl: './locality-template.component.html',
  styleUrl: './locality-template.component.css'
})
export class LocalityTemplateComponent {
  
  @ViewChild(LocalityCardComponent) localityCardComponent!: LocalityCardComponent;

}
