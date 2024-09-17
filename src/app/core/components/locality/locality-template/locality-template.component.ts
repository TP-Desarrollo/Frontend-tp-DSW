import { Component } from '@angular/core';
import { LocalityCardComponent } from "../locality-card/locality-card.component";
import { LocalityAddComponent } from "../locality-add/locality-add.component";
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-locality-template',
  standalone: true,
  imports: [LocalityCardComponent, LocalityAddComponent],
  templateUrl: './locality-template.component.html',
  styleUrl: './locality-template.component.css'
})
export class LocalityTemplateComponent {
  
  @ViewChild(LocalityCardComponent) localityCardComponent!: LocalityCardComponent;

}
