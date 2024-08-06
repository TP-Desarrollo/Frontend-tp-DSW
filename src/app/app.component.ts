import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalidadComponent } from './core/localidad/localidad.component.js';
import { NavbarComponent } from "./core/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocalidadComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
