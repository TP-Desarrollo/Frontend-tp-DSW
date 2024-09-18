import { Component } from '@angular/core';
import { ApiResponse, Locality } from '../../models/interfaces.js';
import { LocalityService } from '../../../services/locality.service.js';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LocalityEditDialogComponent } from '../locality-edit-dialog/locality-edit-dialog.component.js';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-locality-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, LocalityEditDialogComponent],
  templateUrl: './locality-card.component.html',
  styleUrl: './locality-card.component.css'
})
export class LocalityCardComponent {
  apiResponse: ApiResponse | undefined;
  localityData: Locality[] = [];

  constructor(
    private localityService: LocalityService,
    private dialog: MatDialog
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
     const dialogRef = this.dialog.open(LocalityEditDialogComponent, {
      width: '250px',
      data: {...locality}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("edit good")
      }
    });
  }

  deleteLocality(locality: Locality) {
    console.log("delete button")
  }

}


