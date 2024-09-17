import { Component } from '@angular/core';
import { ApiResponse, Locality } from '../../models/interfaces.js';
import { LocalityService } from '../../../services/locality.service.js';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-locality-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './locality-card.component.html',
  styleUrl: './locality-card.component.css'
})
export class LocalityCardComponent {
  apiResponse: ApiResponse | undefined;
  localityData: Locality[] = [];

  constructor(
    private localityService: LocalityService,
    
  ) {}

  ngOnInit(): void {
    this.localityService.refreshNeeded$.subscribe(() => {
      this.getLocalities();
    });
    setTimeout(() => {
      this.getLocalities();
    })
  }

  getLocalities() {
    this.localityService.getLocalities().subscribe({
      next: (response: ApiResponse) => {
        this.apiResponse = response;
        this.localityData = this.apiResponse.data;
      },
      error: (error) => {
        console.log('Error fetching data:', error);
      }
    });
  }

  editLocality(locality: Locality) {
    console.log("edit button")
  }

  deleteLocality(locality: Locality) {
    console.log("delete button")
  }

}


