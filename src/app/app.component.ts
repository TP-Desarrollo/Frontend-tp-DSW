import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalidadComponent } from './core/localidad/localidad.component.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocalidadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
